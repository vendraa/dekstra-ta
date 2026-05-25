// Step 1 — request OTP
export interface LoginOTPRequestPayload {
  email?:    string;
  nik?:      string;
  password:  string;
}

export interface LoginOTPRequestResponse {
  otp?: string; // hanya di development, production tidak dikirim ke client
}

// Step 2 — submit OTP + dapat token
export interface LoginPayload {
  email?:    string;
  nik?:      string;
  password:  string;
  otp:       string;
}

export interface LoginResponse {
  refresh: string;
  access:  string;
  peran:   number;
  nik:     string;
  email:   string;
}