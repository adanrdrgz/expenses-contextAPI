import { ChangeEvent, useMemo, useState } from "react"

const BudgetForm = () => {
  
  const [budget, setBudget] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo(() => { 
    return isNaN(budget) || budget <= 0
  }, [budget])

  return (
    <form action="" className="space-y-5">
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center"> 
                Define Budget
            </label>
            <input 
                id='budget' 
                type="number" 
                className="w-full bg-white border border-gray-200 p-2"
                placeholder="Define your budget"
                name="budget"
                value={budget}
                onChange={e => handleChange(e)}
                
            />
        </div>

        <input 
            type="submit" 
            value='Define Budget'
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white uppercase disabled:opacity-40"
            disabled={isValid}
        />
    </form>
  )
}

export default BudgetForm