import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersMenu {
    loadAnlibreedersMenu() {
        const loadMenu = {

            menu: function () {

                const $hamburger = $("#header #hamburger");
                const $menuClose = $("#menu-close");
                const $menuWindowColor = $("#menu-window-color");

                $hamburger.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("closed")) {
                        utility.menuOpen();
                    } else {
                        utility.menuClosed();
                    }
                });

                $menuClose.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    utility.menuClosed();
                });

                $menuWindowColor.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    utility.menuClosed();
                });

            },

            menuSubCategory: function () {
                const $menuNavigation = $("#menu #navigation");
                $menuNavigation.find("li a[data-func='sub']").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.toggleClass("open closed").parent("li").toggleClass("open closed");
                });

            },

            dropdownMenu: function () {
                $(".dropdown-menu.animal.action .dropdown-item").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataBtn = _this.attr("data-btn");

                    $(".dropdown-menu.animal.action .dropdown-item").each(function () {
                        $(this).removeClass("active");
                        $(this).css({"background-color": ""});
                    });

                    _this.addClass("active");

                    $(".btn-action.btn").each(function () {
                        $(this).addClass("d-none");

                        $(".delete-lock").removeClass("inactive d-none").addClass("active");
                        $(".delete-unlock").removeClass("active").addClass("inactive d-none");

                        $(".delete-lock").parent(".btn-action").removeClass("btn-primary").addClass("btn-danger");
                    });

                    $(".btn-action." + dataBtn).removeClass("d-none");

                    $(".animal-action-name").text(_this[0]['innerText']);
                });

                $(".dropdown-menu.billing-shipping-address.action .dropdown-item").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataBtn = _this.attr("data-btn");

                    $(".dropdown-menu.billing-shipping-address.action .dropdown-item").each(function () {
                        $(this).removeClass("active");
                        $(this).css({"background-color": ""});
                    });

                    _this.addClass("active");

                    $(".btn-action.btn").each(function () {
                        $(this).addClass("d-none");

                        $(".delete-lock").removeClass("inactive d-none").addClass("active");
                        $(".delete-unlock").removeClass("active").addClass("inactive d-none");

                        $(".delete-lock").parent(".btn-action").removeClass("btn-primary").addClass("btn-danger");
                    });

                    $(".btn-action." + dataBtn).removeClass("d-none");

                    $(".billing-action-name").text(_this[0]['innerText']);
                });
            },

            menuAction: function () {
                const $menu = $("#menu");

                // Start Search
                const $searchJump = $menu.find(".search-jump");
                const $search = $("#search .search");
                const $searchInput = $search.find("#searchInput");

                $searchJump.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    utility.menuClosed();

                    setTimeout(
                        function () {
                            $searchInput.trigger("focus");
                        }, 600);
                });
                // End Search
            },

            initializ: function () {
                loadMenu.menu();
                loadMenu.menuSubCategory();
                loadMenu.dropdownMenu();
                loadMenu.menuAction();
            }

        };

        $(function () {
            loadMenu.initializ()
        });
    }
}

export let anlibreedersMenu = new AnlibreedersMenu();