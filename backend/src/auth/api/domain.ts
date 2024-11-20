export interface RegisterDTO {
    email: string;
    password: string;
    displayName: string;
  }
  
  export interface LoginDTO {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
  }
  