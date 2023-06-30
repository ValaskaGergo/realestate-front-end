import PerfectScrollbar from "perfect-scrollbar";
import {cookies} from "brownies";

class AnlibreedersScrollbar {
    loadAnlibreedersScrollbar() {
        const loadScrollbar = {

            scrollbar: function () {

                // Start Menu
                const menu_content = document.querySelector('#menu', {});
                let ps_menu = new PerfectScrollbar(menu_content, {});
                // End menu

                if (cookies.abToken != null) {
                }

            },

            initializ: function () {
                loadScrollbar.scrollbar()
            }

        };

        $(function () {
            loadScrollbar.initializ()
        });
    }
}

export let anlibreedersScrollbar = new AnlibreedersScrollbar();