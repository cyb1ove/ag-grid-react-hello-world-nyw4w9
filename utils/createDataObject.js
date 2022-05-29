import { v4 as uuidv4 } from 'uuid';

export default () => ({
  id: uuidv4(),
  aspiring: [],
  amount: Math.floor(Math.random() * 900) + 100,
});