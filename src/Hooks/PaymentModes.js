import { useParams } from "react-router-dom"

export function usePaymentFunctions(selectedDate, account) {
    const { id, selectedTime, type } = useParams()
    if (selectedDate) {
        //decidePreviousStep
        const decidePreviousStep = function () {
            if (account) {
                if (account.freeClasses > 0 || account.isMember) {
                    return `/book/usefreeclasses/${selectedTime}/${type}`
                } else {
                    return "/book"
                }
            } else {
                return "/book"
            }

        }
        //getProductId
        const getProductId = function () {
            return "walk-in"
        }

        return [decidePreviousStep, getProductId]
    } else {
        //decidePreviousStep

        const decidePreviousStep = function () {
            return "/products"

        }

        //getProductId

        const getProductId = function () {
            
            return id
        }

        return [decidePreviousStep, getProductId]
    }

}