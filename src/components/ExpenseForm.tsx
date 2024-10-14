import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { ChangeEvent, FormEvent, useState } from "react"
import { DraftExpense, Value } from "../types"
import { ErrorMessage } from "./ErrorMessage"



export const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const [error, setError] = useState('')

  const handleChangeDate = (value: Value) => {
    setExpense({
        ...expense,
        date: value
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
        ...expense,
        [name] : isAmountField ? +value : value
    })
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(expense).includes('')){
        setError('All fields must be included')
        return
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
        >
            Add Expense
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            >
                Expense Name:
            </label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Add a Name"
                className="bg-slate-100 p-2 "
                name="expenseName"
                value={expense.expenseName}
                onChange={e => handleChange(e)}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Expense Amount:
            </label>
            <input 
                type="text" 
                id="amount"
                placeholder="Add price: Ex. 300"
                className="bg-slate-100 p-2 "
                name="amount"
                value={expense.amount}
                onChange={e => handleChange(e)}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            >
                Expense Name:
            </label>
            <select 
                id="category"
                className="bg-slate-100 p-2 "
                name="category"
                value={expense.category}
                onChange={e => handleChange(e)}
            >
                <option value="">-- Select --</option>
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Expense Date:
            </label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0 "
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>
        <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" 
            value={'Save'}
        />
    </form>
  )
}
