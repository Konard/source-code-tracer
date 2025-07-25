interface User {
  name: string;
  age: number;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getUser(name: string): User | undefined {
    return this.users.find(u => u.name === name);
  }
}

const service = new UserService();
service.addUser({ name: 'John', age: 30 });

const foundUser = service.getUser('John');
if (foundUser) {
  console.log(`Found user: ${foundUser.name}`);
}