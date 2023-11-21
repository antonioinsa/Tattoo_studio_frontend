export const validator = (type, value) => {

    switch (type) {

        case 'email':

            if (! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/.test(value)) {
                return "Invalid email format";
            } else {
                return "";
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
                return "Incorrect phone number";
            } else {
                return "";
            }

        case 'password':

            if (value.length < 8) {
                return "Write 8 characters at least"
            } else {

                if (! /[\d()+-]/g.test(value)) {
                    return "Invalid password format";
                } else {
                    return "";
                }
            }
        case "price":

            if (typeof (value) !== "string") {
                return `you must insert a string`
            }

        
        
        
        
        
        
        
        
        
        
        
    }
}