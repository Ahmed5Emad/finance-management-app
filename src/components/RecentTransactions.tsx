import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Transaction } from '../App';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.length === 0 ? (
            <div className="text-muted-foreground text-center py-8">
              No transactions yet
            </div>
          ) : (
            recentTransactions.map(transaction => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  {transaction.type === 'income' ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <div>{transaction.description}</div>
                    <div className="text-muted-foreground">
                      {transaction.category}
                    </div>
                  </div>
                </div>
                <div
                  className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                >
                  {transaction.type === 'income' ? '+' : '-'}$
                  {transaction.amount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
