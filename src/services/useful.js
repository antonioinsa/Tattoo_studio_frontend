import dayjs from 'dayjs'
export const validator = (type, value) => {

    switch (type) {

        case 'email':

            if (! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/.test(value)) {
                return "Invalid email format"
            } else {
                return ""
            }

        case 'first_name':
        case 'last_name':

            if (value.length > 25) {
                return "Enter a valid name"
            } else {
                return ""
            }

        case 'phone':

            if (! /(?=.*?[0-9])/.test(value)) {
                return "Incorrect phone number"
            } else {
                return ""
            }

        case 'password':

            if (value.length < 8) {
                return "Write 8 characters at least"
            } else {

                if (! /[\d()+-]/g.test(value)) {
                    return "Invalid password format"
                } else {
                    return ""
                }
            }
        case 'price':
            if (typeof value !== 'string') {
                return "Must insert a string"
            } else {
                const priceRegex = /^\d+(\.\d{1,2})?$/
                if (!priceRegex.test(value)) {
                    return "Price must be a number with up to 2 decimals"
                } else {
                    return ""
                }
            }

        case 'article':
            if (value.trim() === '') {
                return 'Artículo es requerido'
            } else if (!/^\d+$/.test(value)) {
                return "Must contain only numbers"
            } else {
                return ""
            }

        case 'date':
            const selectedDate = dayjs(value);

            if (selectedDate.isBefore(dayjs(), 'minute')) {
                return "You cannot select a date prior to the current date"
            }

            return ""
    }
}












