import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersSignOut {
    loadAnlibreedersSignOut() {
        const loadSignOut = {

            signOut: function () {
                $("body").on("click", "a.signout", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $.ajax({
                        type: "POST",
                        url: "/_sign-out",
                        contentType: "application/json",
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                        },
                        complete: function (xhr, status) {
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            window.location.href = utility.getURL()
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            },

            initializ: function () {
                loadSignOut.signOut()
            }

        };

        $(function () {
            loadSignOut.initializ()
        });
    }
}

export let anlibreedersSignOut = new AnlibreedersSignOut();