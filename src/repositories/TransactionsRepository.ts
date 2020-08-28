import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ITransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const newBalance = { income: 0, outcome: 0, total: 0 };
    var reponseReduce = this.transactions.reduce(
      function (acumulador, valorAtual, indice, array) {
        valorAtual.type === 'income'
          ? (newBalance.income = acumulador.income + valorAtual.value)
          : (newBalance.outcome = acumulador.outcome + valorAtual.value);
        newBalance.total = newBalance.income - newBalance.outcome;
        return newBalance;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return reponseReduce;
  }

  public create(data: ITransactionDTO): Transaction {
    // TODO
    const { title, value, type } = data;
    if (type === 'outcome' && this.getBalance().total < value) {
      throw new Error('Limite excedido!');
    }

    const newRepo = new Transaction({ title, value, type });
    this.transactions.push(newRepo);
    return newRepo;
  }
}

export default TransactionsRepository;
