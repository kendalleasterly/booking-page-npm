import { useParams } from "react-router-dom"

export function usePaymentFunctions(model, account) {
    const { id } = useParams()
    if (model) {
        //decidePreviousStep
        const decidePreviousStep = function () {
            if (account) {
                if (account.freeClasses > 0) {
                    return "/book/usefreeclasses"
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