import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersModals {
    loadAnlibreedersModals() {
        const loadModals = {

            modals: function () {
                $(document).on('show.bs.modal', '.modal', function () {
                    $(this).appendTo('body');
                });
            },

            initializ: function () {
                loadModals.modals()
            }

        };

        $(function () {
            loadModals.initializ()
        });
    }
}

export let anlibreedersModals = new AnlibreedersModals();