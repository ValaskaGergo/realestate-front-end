class AnlibreedersExample {
    loadAnlibreedersExample() {
        const loadExample = {

            example: function () {
                // alert("Example")
            },

            initializ: function () {
                loadExample.example()
            }

        };

        $(function () {
            loadExample.initializ()
        });
    }
}

export let anlibreedersExample = new AnlibreedersExample();