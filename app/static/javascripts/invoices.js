import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersInvoices {
    loadAnlibreedersInvoices() {
        const loadInvoices = {

            invoices: function () {
            },

            initializ: function () {
                loadInvoices.invoices()
            }

        };

        $(function () {
            loadInvoices.initializ()
        });
    }
}

export let anlibreedersInvoices = new AnlibreedersInvoices();