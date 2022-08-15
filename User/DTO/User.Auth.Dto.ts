class UserDTO {
  _id: string;
  name: string;
  email: string;
  phone: number;
  token: string;
  role: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: any) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.token = user.token;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export default UserDTO;
