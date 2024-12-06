import { Router } from 'express';
import { SetupResolver, SetupValueResolver } from '../api/resolver';
import { authenticateToken } from '../../middleware/auth';
import { SetupParameters, Setups, SetupValues } from '../../entities';

const router = Router();
const resolver = new SetupResolver();
const resolverValue = new SetupValueResolver();

router.post('/setup', authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    const setup = await resolver.createSetup({
        name: data.name,
        description: data.description,
        vehicle: data.vehicleId,
        user: req.body.user.userId,
    });
    res.json(setup);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Invalid setup' });
  }
});

router.get('/setup/list', authenticateToken, async (req, res) => {
  try {
    const setups = await resolver.getAllSetups(req.body.user.userId);
    if (!setups) {
      throw new Error();
    }
    res.json(setups);
  } catch (error: any) {
      res.status(400).json({ message: 'Setups not found', error: error.message });
    }
})

router.put('/setup/:id', authenticateToken, async (req, res) => {
    try {
      const setup = await resolver.updateSetup(Number(req.params.id), {
          name: req.body.name,
          description: req.body.description,
          track: req.body.track,
          vehicle: req.body.vehicleId,
      });
      res.json(setup);
    } catch (error) {
      res.status(400).json({ message: 'Invalid setup' });
    }
});

router.delete('/setup/:id', authenticateToken, async (req, res) => {
    try {
      await resolver.deleteSetup(Number(req.params.id));
      res.json({ message: 'Setup deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid setup' });
    }
});

router.get('/setup/:id', authenticateToken, async (req, res) => {
    try {
      delete req.body.user;
      const setup = await resolver.getSetupById(Number(req.params.id));
      if (!setup) {
          throw new Error();
      }
      res.json(setup);
    } catch (error) {
      res.status(400).json({ message: 'Setup not found' });
    }
});

router.post('/setup/:id/values', authenticateToken, async (req, res) => {
    try {
        const setupId = parseInt(req.params.id, 10);
        const { parameterId, value } = req.body;

        // Vérifiez si le setup et le paramètre existent
        const savedValue = await resolverValue.createSetupValue({
            setup: { id: setupId } as Setups,
            parameter: { id: parameterId } as SetupParameters,
            value,
        });

        res.status(201).json({
            setupId: savedValue.setup.id,
            setupValueId: savedValue.id,
            value: savedValue.value,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'An error occurred',
            error: error.message,
        });
    }
});

router.put('/setup/:id/values/:valueId', authenticateToken, async (req, res) => {
  try {
    const setupValue = await resolverValue.updateSetupValue(Number(req.params.valueId), req.body.value);
    if (!setupValue) {
        throw new Error();
    }
    res.json(setupValue);
  } catch (error) {
    res.status(400).json({ message: 'Invalid value' });
  }
});

router.delete('/setup/:id/values/:valueId', authenticateToken, async (req, res) => {
    await resolverValue.deleteSetupValue(Number(req.params.valueId));
    res.json({ message: 'Value deleted' });
});

export default router;
