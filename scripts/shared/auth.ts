export type LighthouseRole =
  | "warga"
  | "rt"
  | "rw"
  | "kades"
  | "admin";

export function getAuthCookie(
  role: LighthouseRole
) {
  switch (role) {
    case "warga":
      return {
        token:
          process.env
            .LIGHTHOUSE_TOKEN_WARGA,
        role: "1",
      };

    case "rt":
      return {
        token:
          process.env
            .LIGHTHOUSE_TOKEN_RT,
        role: "2",
      };

    case "rw":
      return {
        token:
          process.env
            .LIGHTHOUSE_TOKEN_RW,
        role: "3",
      };

    case "kades":
      return {
        token:
          process.env
            .LIGHTHOUSE_TOKEN_KADES,
        role: "4",
      };

    case "admin":
      return {
        token:
          process.env
            .LIGHTHOUSE_TOKEN_ADMIN,
        role: "5",
      };
    default:
      throw new Error(
        `Role ${role} tidak valid`
      );
  }
}