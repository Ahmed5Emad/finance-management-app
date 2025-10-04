import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Transaction } from '../App';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { SpendingChart } from './SpendingChart';
import { RecentTransactions } from './RecentTransactions';

interface DashboardProps {
  transactions: Transaction[];
}

export function Dashboard({ transactions }: DashboardProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`${balance >= 0 ? 'text-foreground' : 'text-destructive'}`}>
              ${balance.toFixed(2)}
            </div>
            <p className="text-muted-foreground mt-1">
              Current balance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Income</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-green-600">
              +${totalIncome.toFixed(2)}
            </div>
            <p className="text-muted-foreground mt-1">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Expenses</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-red-600">
              -${totalExpenses.toFixed(2)}
            </div>
            <p className="text-muted-foreground mt-1">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Transactions */}
      <div className="grid gap-6 md:grid-cols-2">
        <SpendingChart transactions={transactions} />
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
}
