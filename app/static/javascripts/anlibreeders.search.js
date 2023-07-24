import {local, session, cookies} from 'brownies';
import AnlibreedersUtility from './utilities/anlibreeders.utility';

const utility = new AnlibreedersUtility();

class AnlibreedersSearch {
    loadAnlibreedersSearch() {
        const loadSearch = {

            searchInput: function () {
                const $search = $("#search .search");
                const $searchIcon = $search.find(".search-icon");
                const $searchClose = $search.find(".search-close");
                const $searchInput = $search.find("#searchInput");

                const $searchFilterWrap = $("#search #filter-wrap");

                $searchIcon.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $searchInput.trigger("focus");
                });

                $searchClose.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $searchInput.trigger("focusout");
                    $searchFilterWrap.removeClass("active").addClass("inactive");
                    $searchClose.removeClass("active").addClass("inactive");
                });

                $searchInput.on("focus", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $searchClose.removeClass("inactive").addClass("active");
                    $searchFilterWrap.removeClass("inactive").addClass("active");
                });

                let elFilterWrap = document.querySelector('#filter-wrap');
                let heightFilterWrap = elFilterWrap.scrollHeight;
                elFilterWrap.style.setProperty('--max-height', heightFilterWrap + 'px');
            },

            searchListIcon: function () {
                const $filter = $("#filter");
                const $filterPlusIcon = $filter.find(".plus-icon");
                const $filterMinusIcon = $filter.find(".minus-icon");

                $filterPlusIcon.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    _this.parent('.plus').hide();
                    _this.parent('.plus').next(".badge-group").removeClass("inactive").addClass("active");
                });

                $filterMinusIcon.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    _this.parent('.badge-group').removeClass("active").addClass("inactive");
                    _this.parent('.badge-group').prev(".plus").show();
                });
            },

            searchFilterWhere: function () {
                const $search = $("#search .search");
                const $searchInput = $search.find("#searchInput");

                const $filter = $("#filter");
                const $filterWhere = $filter.find("#where");

                const $filterWhereAllInput = $("#filterWhereAllInput");
                const $filterWhereNameInput = $("#filterWhereNameInput");
                const $filterWhereDescriptionInput = $("#filterWhereDescriptionInput");
                const $filterWhereFamilyInput = $("#filterWhereFamilyInput");

                const $filterWhereFamilyMotherInput = $("#filterWhereFamilyMotherInput");
                const $filterWhereFamilyMotherMotherInput = $("#filterWhereFamilyMotherMotherInput");
                const $filterWhereFamilyMotherFatherInput = $("#filterWhereFamilyMotherFatherInput");
                const $filterWhereFamilyMotherMotherMotherInput = $("#filterWhereFamilyMotherMotherMotherInput");
                const $filterWhereFamilyMotherMotherFatherInput = $("#filterWhereFamilyMotherMotherFatherInput");
                const $filterWhereFamilyMotherFatherMotherInput = $("#filterWhereFamilyMotherFatherMotherInput");
                const $filterWhereFamilyMotherFatherFatherInput = $("#filterWhereFamilyMotherFatherFatherInput");
                const $filterWhereFamilyFatherInput = $("#filterWhereFamilyFatherInput");
                const $filterWhereFamilyFatherMotherInput = $("#filterWhereFamilyFatherMotherInput");
                const $filterWhereFamilyFatherFatherInput = $("#filterWhereFamilyFatherFatherInput");
                const $filterWhereFamilyFatherMotherMotherInput = $("#filterWhereFamilyFatherMotherMotherInput");
                const $filterWhereFamilyFatherMotherFatherInput = $("#filterWhereFamilyFatherMotherFatherInput");
                const $filterWhereFamilyFatherFatherMotherInput = $("#filterWhereFamilyFatherFatherMotherInput");
                const $filterWhereFamilyFatherFatherFatherInput = $("#filterWhereFamilyFatherFatherFatherInput");

                const $filterWhereElem = $filterWhere.find(".elem");

                const $filterWhereAll = $filterWhere.find(".filterWhereAll");
                const $filterWhereName = $filterWhere.find(".filterWhereName");
                const $filterWhereDescription = $filterWhere.find(".filterWhereDescription");
                const $filterWhereFamily = $filterWhere.find(".filterWhereFamily");
                const $filterWhereFamilyGroup = $filterWhere.find(".family-group");
                const $filterWhereFamilyMother = $filterWhere.find(".filterWhereFamilyMother");
                const $filterWhereFamilyMotherMother = $filterWhere.find(".filterWhereFamilyMotherMother");
                const $filterWhereFamilyMotherFather = $filterWhere.find(".filterWhereFamilyMotherFather");
                const $filterWhereFamilyMotherMotherMother = $filterWhere.find(".filterWhereFamilyMotherMotherMother");
                const $filterWhereFamilyMotherMotherFather = $filterWhere.find(".filterWhereFamilyMotherMotherFather");
                const $filterWhereFamilyMotherFatherMother = $filterWhere.find(".filterWhereFamilyMotherFatherMother");
                const $filterWhereFamilyMotherFatherFather = $filterWhere.find(".filterWhereFamilyMotherFatherFather");
                const $filterWhereFamilyFather = $filterWhere.find(".filterWhereFamilyFather");
                const $filterWhereFamilyFatherMother = $filterWhere.find(".filterWhereFamilyFatherMother");
                const $filterWhereFamilyFatherFather = $filterWhere.find(".filterWhereFamilyFatherFather");
                const $filterWhereFamilyFatherMotherMother = $filterWhere.find(".filterWhereFamilyFatherMotherMother");
                const $filterWhereFamilyFatherMotherFather = $filterWhere.find(".filterWhereFamilyFatherMotherFather");
                const $filterWhereFamilyFatherFatherMother = $filterWhere.find(".filterWhereFamilyFatherFatherMother");
                const $filterWhereFamilyFatherFatherFather = $filterWhere.find(".filterWhereFamilyFatherFatherFather");

                // Start Search Input
                if ($searchInput.val() !== "") {
                    if ($searchInput.val().trim().length >= 3) {
                        $filterWhere.removeClass("inactive").addClass("active");
                    } else {
                        $filterWhere.removeClass("active").addClass("inactive");
                    }
                } else {
                    $filterWhere.removeClass("active").addClass("inactive");
                }

                $searchInput.on("keyup", function (event) {
                    event.stopPropagation();

                    const _this = $(this);
                    let query = _this.val();

                    if (query !== '' && query.trim().length >= 3) {

                        if ($filterWhere.hasClass("inactive")) {
                            $filterWhere.removeClass("inactive").addClass("active");
                        }

                    }

                    if (query === '' || query.trim().length < 3) {
                        if ($filterWhere.hasClass("active")) {
                            $filterWhere.removeClass("active").addClass("inactive");
                        }

                        $("#filter #where .elem.multiple").each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            $filterWhereAllInput.val("active");
                            $filterWhereNameInput.val("inactive");
                            $filterWhereDescriptionInput.val("inactive");
                            $filterWhereFamilyInput.val("inactive");
                            $filterWhereFamilyMotherInput.val("inactive");
                            $filterWhereFamilyMotherMotherInput.val("inactive");
                            $filterWhereFamilyMotherFatherInput.val("inactive");
                            $filterWhereFamilyMotherMotherMotherInput.val("inactive");
                            $filterWhereFamilyMotherMotherFatherInput.val("inactive");
                            $filterWhereFamilyMotherFatherMotherInput.val("inactive");
                            $filterWhereFamilyMotherFatherFatherInput.val("inactive");
                            $filterWhereFamilyFatherInput.val("inactive");
                            $filterWhereFamilyFatherMotherInput.val("inactive");
                            $filterWhereFamilyFatherFatherInput.val("inactive");
                            $filterWhereFamilyFatherMotherMotherInput.val("inactive");
                            $filterWhereFamilyFatherMotherFatherInput.val("inactive");
                            $filterWhereFamilyFatherFatherMotherInput.val("inactive");
                            $filterWhereFamilyFatherFatherFatherInput.val("inactive");
                        });

                        $filterWhereAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });
                        $filterWhereFamilyGroup.removeClass("active").addClass("inactive");
                    }

                });
                // End Search Input

                // Start Elem Click

                $filterWhereElem.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    // Start Singe
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        if (dataName === "filterWhereAll") {
                            $filterWhereAll.each(function () {
                                $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            });

                            $("#filter #where .multiple.active").each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });

                            $filterWhereFamilyGroup.removeClass("active").addClass("inactive");
                            $("#filter #where .family-group .elem.multiple.active").each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                                $filterWhereAllInput.val("active");
                            });

                            $filterWhereAllInput.val("active");
                            $filterWhereNameInput.val("inactive");
                            $filterWhereDescriptionInput.val("inactive");
                            $filterWhereFamilyInput.val("inactive");
                            $filterWhereFamilyMotherInput.val("inactive");
                            $filterWhereFamilyMotherMotherInput.val("inactive");
                            $filterWhereFamilyMotherFatherInput.val("inactive");
                            $filterWhereFamilyMotherMotherMotherInput.val("inactive");
                            $filterWhereFamilyMotherMotherFatherInput.val("inactive");
                            $filterWhereFamilyMotherFatherMotherInput.val("inactive");
                            $filterWhereFamilyMotherFatherFatherInput.val("inactive");
                            $filterWhereFamilyFatherInput.val("inactive");
                            $filterWhereFamilyFatherMotherInput.val("inactive");
                            $filterWhereFamilyFatherFatherInput.val("inactive");
                            $filterWhereFamilyFatherMotherMotherInput.val("inactive");
                            $filterWhereFamilyFatherMotherFatherInput.val("inactive");
                            $filterWhereFamilyFatherFatherMotherInput.val("inactive");
                            $filterWhereFamilyFatherFatherFatherInput.val("inactive");
                        }
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {

                        $filterWhereAll.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            $filterWhereAllInput.val("inactive");
                        });

                        _this.removeClass("inactive").addClass("active").attr("data-status", "active");

                        if (dataName === "filterWhereName") {
                            $filterWhereNameInput.val("active");
                        }

                        if (dataName === "filterWhereDescription") {
                            $filterWhereDescriptionInput.val("active");
                        }

                        if (dataName === "filterWhereFamily") {
                            $filterWhereFamilyInput.val("active");
                            $filterWhereFamilyGroup.removeClass("inactive").addClass("active");
                        }

                        if (dataName === "filterWhereFamilyMother") {
                            $filterWhereFamilyMotherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyMotherMother") {
                            $filterWhereFamilyMotherMotherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyMotherFather") {
                            $filterWhereFamilyMotherFatherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyMotherMotherMother") {
                            $filterWhereFamilyMotherMotherMotherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyMotherMotherFather") {
                            $filterWhereFamilyMotherMotherFatherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyMotherFatherMother") {
                            $filterWhereFamilyMotherFatherMotherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyMotherFatherFather") {
                            $filterWhereFamilyMotherFatherFatherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyFather") {
                            $filterWhereFamilyFatherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyFatherMother") {
                            $filterWhereFamilyFatherMotherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyFatherFather") {
                            $filterWhereFamilyFatherFatherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyFatherMotherMother") {
                            $filterWhereFamilyFatherMotherMotherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyFatherMotherFather") {
                            $filterWhereFamilyFatherMotherFatherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyFatherFatherMother") {
                            $filterWhereFamilyFatherFatherMotherInput.val("active");
                        }

                        if (dataName === "filterWhereFamilyFatherFatherFather") {
                            $filterWhereFamilyFatherFatherFatherInput.val("active");
                        }

                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {

                        _this.removeClass("active").addClass("inactive").attr("data-status", "inactive");

                        if (dataName === "filterWhereName") {
                            $filterWhereNameInput.val("inactive");
                        }

                        if (dataName === "filterWhereDescription") {
                            $filterWhereDescriptionInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamily") {
                            $filterWhereFamilyInput.val("inactive");
                            $filterWhereFamilyGroup.removeClass("active").addClass("inactive");

                            $("#filter #where .family-group .elem.multiple.active").each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                                $filterWhereAllInput.val("active");
                            });

                            $filterWhereFamilyMotherInput.val("inactive");
                            $filterWhereFamilyMotherMotherInput.val("inactive");
                            $filterWhereFamilyMotherFatherInput.val("inactive");
                            $filterWhereFamilyMotherMotherMotherInput.val("inactive");
                            $filterWhereFamilyMotherMotherFatherInput.val("inactive");
                            $filterWhereFamilyMotherFatherMotherInput.val("inactive");
                            $filterWhereFamilyMotherFatherFatherInput.val("inactive");
                            $filterWhereFamilyFatherInput.val("inactive");
                            $filterWhereFamilyFatherMotherInput.val("inactive");
                            $filterWhereFamilyFatherFatherInput.val("inactive");
                            $filterWhereFamilyFatherMotherMotherInput.val("inactive");
                            $filterWhereFamilyFatherMotherFatherInput.val("inactive");
                            $filterWhereFamilyFatherFatherMotherInput.val("inactive");
                            $filterWhereFamilyFatherFatherFatherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyMother") {
                            $filterWhereFamilyMotherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyMotherMother") {
                            $filterWhereFamilyMotherMotherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyMotherFather") {
                            $filterWhereFamilyMotherFatherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyMotherMotherMother") {
                            $filterWhereFamilyMotherMotherMotherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyMotherMotherFather") {
                            $filterWhereFamilyMotherMotherFatherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyMotherFatherMother") {
                            $filterWhereFamilyMotherFatherMotherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyMotherFatherFather") {
                            $filterWhereFamilyMotherFatherFatherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyFather") {
                            $filterWhereFamilyFatherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyFatherMother") {
                            $filterWhereFamilyFatherMotherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyFatherFather") {
                            $filterWhereFamilyFatherFatherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyFatherMotherMother") {
                            $filterWhereFamilyFatherMotherMotherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyFatherMotherFather") {
                            $filterWhereFamilyFatherMotherFatherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyFatherFatherMother") {
                            $filterWhereFamilyFatherFatherMotherInput.val("inactive");
                        }

                        if (dataName === "filterWhereFamilyFatherFatherFather") {
                            $filterWhereFamilyFatherFatherFatherInput.val("inactive");
                        }

                        if ($("#filter #where .elem.multiple.active").length === 0) {
                            $filterWhereAll.each(function () {
                                $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                                $filterWhereAllInput.val("active");
                            });
                        }

                    }
                    // End Multiple
                    if (dataName === "filterWhereAll") {
                        $filterWhereAllInput.trigger("change");
                    }

                    if (dataName === "filterWhereName") {
                        $filterWhereNameInput.trigger("change");
                    }

                    if (dataName === "filterWhereDescription") {
                        $filterWhereDescriptionInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamily") {
                        $filterWhereFamilyInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyMother") {
                        $filterWhereFamilyMotherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyMotherMother") {
                        $filterWhereFamilyMotherMotherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyMotherFather") {
                        $filterWhereFamilyMotherFatherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyMotherMotherMother") {
                        $filterWhereFamilyMotherMotherMotherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyMotherMotherFather") {
                        $filterWhereFamilyMotherMotherFatherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyMotherFatherMother") {
                        $filterWhereFamilyMotherFatherMotherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyMotherFatherFather") {
                        $filterWhereFamilyMotherFatherFatherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyFather") {
                        $filterWhereFamilyFatherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyFatherMother") {
                        $filterWhereFamilyFatherMotherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyFatherFather") {
                        $filterWhereFamilyFatherFatherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyFatherMotherMother") {
                        $filterWhereFamilyFatherMotherMotherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyFatherMotherFather") {
                        $filterWhereFamilyFatherMotherFatherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyFatherFatherMother") {
                        $filterWhereFamilyFatherFatherMotherInput.trigger("change");
                    }

                    if (dataName === "filterWhereFamilyFatherFatherFather") {
                        $filterWhereFamilyFatherFatherFatherInput.trigger("change");
                    }
                });
                // End Elem Click
            },

            searchFilterPrice: function () {
                const priceSlider = document.getElementById('price-slider');

                const $filter = $("#filter");
                const $filterPrice = $filter.find("#price");
                const $filterPriceTooltipLower = $filterPrice.find(".text .tooltip-lower");
                const $filterPriceTooltipUpper = $filterPrice.find(".text .tooltip-upper");

                const $filterPriceMinInput = $("#filterPriceMinInput");
                const $filterPriceMaxInput = $("#filterPriceMaxInput");

                noUiSlider.create(priceSlider, {
                    start: [parseInt(process.env.FILTER_PRICE_MIN), parseInt(process.env.FILTER_PRICE_MAX)],
                    step: parseInt(process.env.FILTER_PRICE_STEP),
                    connect: true,
                    tooltips: [true, true],
                    format: wNumb({
                        decimals: 0,
                        thousand: '.',
                        suffix: '',
                        prefix: '€'
                    }),
                    range: {
                        'min': [parseInt(process.env.FILTER_PRICE_MIN)],
                        'max': [parseInt(process.env.FILTER_PRICE_MAX)]
                    }
                });

                priceSlider.noUiSlider.on('update', function (values, handle) {
                    $filterPriceTooltipLower.text(values[0]);
                    $filterPriceTooltipUpper.text(values[1]);
                });

                priceSlider.noUiSlider.on('change', function (values, handle) {
                    let valMin = values[0].replace("€", "");
                    let valMax = values[1].replace("€", "");

                    $filterPriceMinInput.val(valMin.replace(".", ""));
                    $filterPriceMaxInput.val(valMax.replace(".", ""));

                    $filterPriceMinInput.trigger("change");
                    $filterPriceMaxInput.trigger("change");
                });

                // priceSlider.setAttribute('disabled', true);
                /*if (priceSlider.getAttribute('disabled')) {
                    priceSlider.style.opacity = "0.4";
                }*/
            },

            searchFilterCategoryAjax: function () {
                const $filter = $("#filter");

                let $subcategory = $filter.find("#subcategory");
                let $filterSubcategories = $subcategory.find(".filterSubcategories");

                let $gender = $filter.find("#gender");
                let $filterGender = $gender.find(".filterGender");

                let $color = $filter.find("#color");
                let $filterColor = $color.find(".filterColor");

                let $beUsedFor = $filter.find("#beUsedFor");
                let $filterBeUsedFor = $beUsedFor.find(".filterBeUsedFor");

                let $age = $filter.find("#age");

                let $height = $filter.find("#height");

                let subcategoryData;
                $.ajax({
                    type: "POST",
                    url: "/_get-filter-category",
                    contentType: "application/json",
                    data: JSON.stringify($("#filter-form").serializeObject()),
                    beforeSend: function (xhr) {
                        $filterSubcategories.html("");
                        $filterGender.html("");
                        $filterColor.html("");
                        $filterBeUsedFor.html("");
                    },
                    success: function (result, status, xhr) {
                        subcategoryData = result['message'];
                    },
                    complete: function (xhr, status) {
                        let statusCode = xhr['status'];

                        if (statusCode === 200) {

                            let subcategories = subcategoryData['subcategory_list_all'];
                            let gender = subcategoryData['category_gender'][0]['gender_sort'];
                            let color = subcategoryData['category_color'][0]['color_sort'];
                            let beUsedFor = subcategoryData['category_be_used_for'][0]['be_used_for_sort'];

                            // Start Subcategories
                            if (subcategories !== [] && subcategories.length !== 0) {
                                $subcategory.removeClass("inactive").addClass("active");
                                for (let i_subcategories = 0; i_subcategories < subcategories.length; i_subcategories++) {
                                    let subcategori_name = ""

                                    if (subcategories[i_subcategories]['lang'] === "hu") {
                                        subcategori_name = subcategories[i_subcategories]['name_hu']
                                    }
                                    if (subcategories[i_subcategories]['lang'] === "en") {
                                        subcategori_name = subcategories[i_subcategories]['name_en']
                                    }
                                    if (subcategories[i_subcategories]['lang'] === "de") {
                                        subcategori_name = subcategories[i_subcategories]['name_de']
                                    }
                                    if (subcategories[i_subcategories]['lang'] === "fr") {
                                        subcategori_name = subcategories[i_subcategories]['name_fr']
                                    }
                                    if (subcategories[i_subcategories]['lang'] === "es") {
                                        subcategori_name = subcategories[i_subcategories]['name_es']
                                    }

                                    $filterSubcategories.append(
                                        '<span class="badge elem multiple inactive" data-name="' + subcategories[i_subcategories]['id'] + '" data-status="inactive">' +
                                        '<span class="text">' +
                                        subcategori_name +
                                        '</span>' +
                                        '</span>'
                                    ).promise().done(function () {
                                    });

                                }
                            } else {
                                $subcategory.removeClass("active").addClass("inactive");
                            }
                            // End Subcategories

                            // Start Gender
                            if (gender !== [] && gender.length !== 0) {
                                $gender.removeClass("inactive").addClass("active");
                                for (let i_gender = 0; i_gender < gender.length; i_gender++) {
                                    $filterGender.append(
                                        '<span class="badge elem multiple inactive" data-name="' + gender[i_gender] + '" data-status="inactive">' +
                                        '<span class="text">' +
                                        gender[i_gender] +
                                        '</span>' +
                                        '</span>'
                                    ).promise().done(function () {
                                    });
                                }
                            } else {
                                $gender.removeClass("active").addClass("inactive");
                            }
                            // End Gender

                            // Start Color
                            if (color !== [] && color.length !== 0) {
                                $color.removeClass("inactive").addClass("active");
                                for (let i_color = 0; i_color < color.length; i_color++) {
                                    $filterColor.append(
                                        '<span class="badge elem multiple inactive" data-name="' + color[i_color] + '" data-status="inactive">' +
                                        '<span class="text">' +
                                        color[i_color] +
                                        '</span>' +
                                        '</span>'
                                    ).promise().done(function () {
                                    });
                                }
                            } else {
                                $color.removeClass("active").addClass("inactive");
                            }
                            // End Color

                            // Start Be Used For
                            if (beUsedFor !== [] && beUsedFor.length !== 0) {
                                $beUsedFor.removeClass("inactive").addClass("active");
                                for (let i_be_used_for = 0; i_be_used_for < beUsedFor.length; i_be_used_for++) {
                                    $filterBeUsedFor.append(
                                        '<span class="badge elem multiple inactive" data-name="' + beUsedFor[i_be_used_for] + '" data-status="inactive">' +
                                        '<span class="text">' +
                                        beUsedFor[i_be_used_for] +
                                        '</span>' +
                                        '</span>'
                                    ).promise().done(function () {
                                    });
                                }
                            } else {
                                $beUsedFor.removeClass("active").addClass("inactive");
                            }
                            // End Color

                            // Start Age
                            $age.removeClass("inactive").addClass("active");

                            loadSearch.searchFilterAgeUpdate();
                            // End Age

                            // Start Height
                            $height.removeClass("inactive").addClass("active");

                            loadSearch.searchFilterHeightUpdate();
                            // End Height
                        } else {
                        }
                    },
                    error: function (xhr, status, error) {
                    }
                });
            },

            searchFilterCategory: function () {
                const $filter = $("#filter");
                const $filterCategory = $filter.find("#category");

                const $filterCategoryInput = $("#filterCategoryInput");

                const $filterCategoryAll = $filterCategory.find(".filterCategoryAll");
                const $filterCategoryElem = $filterCategory.find(".elem");

                let $subcategory = $filter.find("#subcategory");
                let $filterSubcategories = $subcategory.find(".filterSubcategories");

                let $gender = $filter.find("#gender");
                let $filterGender = $gender.find(".filterGender");

                let $color = $filter.find("#color");
                let $filterColor = $color.find(".filterColor");

                let $beUsedFor = $filter.find("#beUsedFor");
                let $filterBeUsedFor = $beUsedFor.find(".filterBeUsedFor");

                let $age = $filter.find("#age");

                let $height = $filter.find("#height");

                // Start Elem Click
                $filterCategoryElem.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    let filterCategoryList = JSON.parse($filterCategoryInput.val());

                    $("#filterSubcategoryInput").val("[0]");
                    $("#filterGenderInput").val("[0]");
                    $("#filterColorInput").val("[0]");
                    $("#filterBeUsedForInput").val("[0]");

                    $subcategory.find(".elem.single").removeClass("inactive").addClass("active");
                    $gender.find(".elem.single").removeClass("inactive").addClass("active");
                    $color.find(".elem.single").removeClass("inactive").addClass("active");
                    $beUsedFor.find(".elem.single").removeClass("inactive").addClass("active");

                    loadSearch.searchFilterAgeUpdate();
                    const $filterAgeMinInput = $("#filterAgeMinInput");
                    const $filterAgeMaxInput = $("#filterAgeMaxInput");
                    $filterAgeMinInput.val(process.env.FILTER_AGE_MIN);
                    $filterAgeMaxInput.val(process.env.FILTER_AGE_MAX);

                    loadSearch.searchFilterHeightUpdate();
                    const $filterHeightMinInput = $("#filterHeightMinInput");
                    const $filterHeightMaxInput = $("#filterHeightMaxInput");
                    $filterHeightMinInput.val(process.env.FILTER_HEIGHT_MIN);
                    $filterHeightMaxInput.val(process.env.FILTER_HEIGHT_MAX);

                    // Start Single
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        $("#filter #category .multiple.active").each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        $filterCategoryAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });

                        filterCategoryList = [0];
                        $filterCategoryInput.val(JSON.stringify(filterCategoryList));
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {
                        $filterCategoryAll.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        if (filterCategoryList.includes(0)) {
                            filterCategoryList = filterCategoryList.filter((value) => value != 0);
                        }
                        filterCategoryList.push(parseInt(dataName));
                        $filterCategoryInput.val(JSON.stringify(filterCategoryList));
                        _this.removeClass("inactive").addClass("active").attr("data-status", "active");

                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {
                        filterCategoryList = filterCategoryList.filter((value) => value != parseInt(dataName));
                        $filterCategoryInput.val(JSON.stringify(filterCategoryList));
                        _this.removeClass("active").addClass("inactive").attr("data-status", "inactive");

                        if (filterCategoryList.length === 0) {
                            $filterCategoryAll.each(function () {
                                $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            });
                            filterCategoryList.push(0);
                            $filterCategoryInput.val(JSON.stringify(filterCategoryList));
                        }
                    }

                    if (!filterCategoryList.includes(0)) {
                        if (filterCategoryList.length === 1) {
                            // Start Category
                            loadSearch.searchFilterCategoryAjax();
                            // End Category

                        } else {
                            $subcategory.removeClass("active").addClass("inactive");
                            $gender.removeClass("active").addClass("inactive");
                            $color.removeClass("active").addClass("inactive");
                            $beUsedFor.removeClass("active").addClass("inactive");
                            $age.removeClass("active").addClass("inactive");
                            $height.removeClass("active").addClass("inactive");
                        }
                    } else {
                        $subcategory.removeClass("active").addClass("inactive");
                        $gender.removeClass("active").addClass("inactive");
                        $color.removeClass("active").addClass("inactive");
                        $beUsedFor.removeClass("active").addClass("inactive");
                        $age.removeClass("active").addClass("inactive");
                        $height.removeClass("active").addClass("inactive");
                    }
                    // End Multiple
                    $filterCategoryInput.trigger("change");
                });
                // End Elem Click
            },

            searchFilterSubcategory: function () {
                const $filter = $("#filter");
                const $filterSubcategory = $filter.find("#subcategory");

                const $filterSubcategoryInput = $("#filterSubcategoryInput");

                const $filterSubcategoryAll = $filterSubcategory.find(".filterSubcategoryAll");
                const $filterSubcategoryElem = $filterSubcategory.find(".elem");

                // Start Elem Click
                $("body").on("click", "#filter #subcategory .elem", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    let filterSubcategoryList = JSON.parse($filterSubcategoryInput.val());

                    // Start Single
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        $("#filter #subcategory .multiple.active").each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        $filterSubcategoryAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });

                        filterSubcategoryList = [0];
                        $filterSubcategoryInput.val(JSON.stringify(filterSubcategoryList));
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {
                        $filterSubcategoryAll.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        if (filterSubcategoryList.includes(0)) {
                            filterSubcategoryList = filterSubcategoryList.filter((value) => value != 0);
                        }
                        filterSubcategoryList.push(parseInt(dataName));
                        $filterSubcategoryInput.val(JSON.stringify(filterSubcategoryList));
                        _this.removeClass("inactive").addClass("active").attr("data-status", "active");

                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {
                        filterSubcategoryList = filterSubcategoryList.filter((value) => value != parseInt(dataName));
                        $filterSubcategoryInput.val(JSON.stringify(filterSubcategoryList));
                        _this.removeClass("active").addClass("inactive").attr("data-status", "inactive");

                        if (filterSubcategoryList.length === 0) {
                            $filterSubcategoryAll.each(function () {
                                $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            });
                            filterSubcategoryList.push(0);
                            $filterSubcategoryInput.val(JSON.stringify(filterSubcategoryList));
                        }
                    }
                    // End Multiple
                    $filterSubcategoryInput.trigger("change")
                });
                // End Elem Click
            },

            searchFilterGender: function () {
                const $filter = $("#filter");
                const $filterGender = $filter.find("#gender");

                const $filterGenderInput = $("#filterGenderInput");

                const $filterGenderAll = $filterGender.find(".filterGenderAll");
                const $filterGenderElem = $filterGender.find(".elem");

                // Start Elem Click
                $("body").on("click", "#filter #gender .elem", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    let filterGenderList = JSON.parse($filterGenderInput.val());

                    // Start Single
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        $("#filter #gender .multiple.active").each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        $filterGenderAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });

                        filterGenderList = [0];
                        $filterGenderInput.val(JSON.stringify(filterGenderList));
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {
                        $filterGenderAll.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        if (filterGenderList.includes(0)) {
                            filterGenderList = filterGenderList.filter((value) => value != 0);
                        }
                        filterGenderList.push(dataName);
                        $filterGenderInput.val(JSON.stringify(filterGenderList));
                        _this.removeClass("inactive").addClass("active").attr("data-status", "active");

                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {
                        filterGenderList = filterGenderList.filter((value) => value != dataName);
                        $filterGenderInput.val(JSON.stringify(filterGenderList));
                        _this.removeClass("active").addClass("inactive").attr("data-status", "inactive");

                        if (filterGenderList.length === 0) {
                            $filterGenderAll.each(function () {
                                $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            });
                            filterGenderList.push(0);
                            $filterGenderInput.val(JSON.stringify(filterGenderList));
                        }
                    }
                    // End Multiple
                    $filterGenderInput.trigger("change");
                });
                // End Elem Click
            },

            searchFilterColor: function () {
                const $filter = $("#filter");
                const $filterColor = $filter.find("#color");

                const $filterColorInput = $("#filterColorInput");

                const $filterColorAll = $filterColor.find(".filterColorAll");
                const $filterColorElem = $filterColor.find(".elem");

                // Start Elem Click
                $("body").on("click", "#filter #color .elem", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    let filterColorList = JSON.parse($filterColorInput.val());

                    // Start Single
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        $("#filter #color .multiple.active").each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        $filterColorAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });

                        filterColorList = [0];
                        $filterColorInput.val(JSON.stringify(filterColorList));
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {
                        $filterColorAll.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        if (filterColorList.includes(0)) {
                            filterColorList = filterColorList.filter((value) => value != 0);
                        }
                        filterColorList.push(dataName);
                        $filterColorInput.val(JSON.stringify(filterColorList));
                        _this.removeClass("inactive").addClass("active").attr("data-status", "active");

                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {
                        filterColorList = filterColorList.filter((value) => value != dataName);
                        $filterColorInput.val(JSON.stringify(filterColorList));
                        _this.removeClass("active").addClass("inactive").attr("data-status", "inactive");

                        if (filterColorList.length === 0) {
                            $filterColorAll.each(function () {
                                $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            });
                            filterColorList.push(0);
                            $filterColorInput.val(JSON.stringify(filterColorList));
                        }
                    }
                    // End Multiple
                    $filterColorInput.trigger("change");
                });
                // End Elem Click
            },

            searchFilterBeUsedFor: function () {
                const $filter = $("#filter");
                const $filterBeUsedFor = $filter.find("#beUsedFor");

                const $filterBeUsedForInput = $("#filterBeUsedForInput");

                const $filterBeUsedForAll = $filterBeUsedFor.find(".filterBeUsedForAll");
                const $filterBeUsedForElem = $filterBeUsedFor.find(".elem");

                // Start Elem Click
                $("body").on("click", "#filter #beUsedFor .elem", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    let filterBeUsedForList = JSON.parse($filterBeUsedForInput.val());

                    // Start Single
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        $("#filter #beUsedFor .multiple.active").each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        $filterBeUsedForAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });

                        filterBeUsedForList = [0];
                        $filterBeUsedForInput.val(JSON.stringify(filterBeUsedForList));
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {
                        $filterBeUsedForAll.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        if (filterBeUsedForList.includes(0)) {
                            filterBeUsedForList = filterBeUsedForList.filter((value) => value != 0);
                        }
                        filterBeUsedForList.push(dataName);
                        $filterBeUsedForInput.val(JSON.stringify(filterBeUsedForList));
                        _this.removeClass("inactive").addClass("active").attr("data-status", "active");

                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {
                        filterBeUsedForList = filterBeUsedForList.filter((value) => value != dataName);
                        $filterBeUsedForInput.val(JSON.stringify(filterBeUsedForList));
                        _this.removeClass("active").addClass("inactive").attr("data-status", "inactive");

                        if (filterBeUsedForList.length === 0) {
                            $filterBeUsedForAll.each(function () {
                                $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            });
                            filterBeUsedForList.push(0);
                            $filterBeUsedForInput.val(JSON.stringify(filterBeUsedForList));
                        }
                    }
                    // End Multiple
                    $filterBeUsedForInput.trigger("change");
                });
                // End Elem Click
            },

            searchFilterAge: function () {
                const ageSlider = document.getElementById('age-slider');

                const $filter = $("#filter");
                const $filterAge = $filter.find("#age");
                const $filterAgeTooltipLower = $filterAge.find(".text .tooltip-lower");
                const $filterAgeTooltipUpper = $filterAge.find(".text .tooltip-upper");

                const $filterAgeMinInput = $("#filterAgeMinInput");
                const $filterAgeMaxInput = $("#filterAgeMaxInput");

                noUiSlider.create(ageSlider, {
                    start: [parseInt(process.env.FILTER_AGE_MIN), parseInt(process.env.FILTER_AGE_MAX)],
                    step: parseInt(process.env.FILTER_AGE_STEP),
                    connect: true,
                    tooltips: [true, true],
                    format: wNumb({
                        decimals: 0,
                    }),
                    range: {
                        'min': [parseInt(process.env.FILTER_AGE_MIN)],
                        'max': [parseInt(process.env.FILTER_AGE_MAX)]
                    }
                });

                ageSlider.noUiSlider.on('update', function (values, handle) {
                    $filterAgeTooltipLower.text(values[0]);
                    $filterAgeTooltipUpper.text(values[1]);
                });

                ageSlider.noUiSlider.on('change', function (values, handle) {
                    let valMin = values[0].replace("€", "");
                    let valMax = values[1].replace("€", "");

                    $filterAgeMinInput.val(valMin.replace(".", ""));
                    $filterAgeMaxInput.val(valMax.replace(".", ""));

                    $filterAgeMinInput.trigger("change");
                    $filterAgeMaxInput.trigger("change");
                });

                $filterAge.addClass("inactive");
            },

            searchFilterAgeUpdate: function () {
                const ageSlider = document.getElementById('age-slider');

                ageSlider.noUiSlider.updateOptions({
                    start: [parseInt(process.env.FILTER_AGE_MIN), parseInt(process.env.FILTER_AGE_MAX)],
                });
            },

            searchFilterCountryResidence: function () {
                const $filter = $("#filter");
                const $countryResidence = $filter.find("#countryResidence");

                const $filterRegionResidenceInput = $("#filterRegionResidenceInput");
                const $filterCountryResidenceInput = $("#filterCountryResidenceInput");

                const $filterCountryResidenceAll = $countryResidence.find(".filterCountryResidenceAll");
                const $filterCountryResidenceElem = $countryResidence.find(".elem");
                const $filterCountryResidenceRegionElem = $countryResidence.find(".elem.region");
                const $filterCountryResidenceCountryElem = $countryResidence.find(".elem.country");
                const $filterCountryResidenceCountriesGroup = $countryResidence.find(".countries-group");

                // Start Elem Click
                $filterCountryResidenceElem.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    // Start Single
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        $filterCountryResidenceCountryElem.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });
                        $filterCountryResidenceCountriesGroup.each(function () {
                            $(this).removeClass("active").addClass("inactive");
                        });
                        $filterCountryResidenceRegionElem.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        $filterCountryResidenceAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });
                        $filterRegionResidenceInput.val("ALL");
                        $filterCountryResidenceInput.val("ALL");
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {
                        if (_this.hasClass("region")) {

                            $filterCountryResidenceAll.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });
                            $filterCountryResidenceRegionElem.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });
                            $filterCountryResidenceCountriesGroup.each(function () {
                                $(this).removeClass("active").addClass("inactive");
                            });
                            $filterCountryResidenceCountryElem.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });
                            $filterCountryResidenceInput.val("ALL");

                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            $filterRegionResidenceInput.val(dataName);

                            $('.countries-group.countries-residence[data-region_code="' + _this.attr("ID") + '"]').removeClass("inactive").addClass("active");
                        } else if (_this.hasClass("country")) {

                            $filterCountryResidenceCountryElem.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });

                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            $filterCountryResidenceInput.val(dataName);

                        }
                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {
                        if (_this.hasClass("region")) {
                        } else if (_this.hasClass("country")) {
                        }
                    }
                    // End Multiple
                    $filterRegionResidenceInput.trigger("change");
                    $filterCountryResidenceInput.trigger("change");
                })
                // End Elem Click
            },

            searchFilterCountryOrigin: function () {
                const $filter = $("#filter");
                const $countryOrigin = $filter.find("#countryOrigin");

                const $filterRegionOriginInput = $("#filterRegionOriginInput");
                const $filterCountryOriginInput = $("#filterCountryOriginInput");

                const $filterCountryOriginAll = $countryOrigin.find(".filterCountryOriginAll");
                const $filterCountryOriginElem = $countryOrigin.find(".elem");
                const $filterCountryOriginRegionElem = $countryOrigin.find(".elem.region");
                const $filterCountryOriginCountryElem = $countryOrigin.find(".elem.country");
                const $filterCountryOriginCountriesGroup = $countryOrigin.find(".countries-group");

                // Start Elem Click
                $filterCountryOriginElem.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataName = _this.attr("data-name");
                    let dataStatus = _this.attr("data-status");

                    // Start Single
                    if (_this.hasClass("single") && _this.hasClass("active")) {
                    } else if (_this.hasClass("single") && _this.hasClass("inactive")) {
                        $filterCountryOriginCountryElem.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });
                        $filterCountryOriginCountriesGroup.each(function () {
                            $(this).removeClass("active").addClass("inactive");
                        });
                        $filterCountryOriginRegionElem.each(function () {
                            $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                        });

                        $filterCountryOriginAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });
                        $filterRegionOriginInput.val("ALL");
                        $filterCountryOriginInput.val("ALL");
                    }
                    // End Single

                    // Start Multiple
                    if (_this.hasClass("multiple") && _this.hasClass("inactive")) {
                        if (_this.hasClass("region")) {

                            $filterCountryOriginAll.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });
                            $filterCountryOriginRegionElem.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });
                            $filterCountryOriginCountriesGroup.each(function () {
                                $(this).removeClass("active").addClass("inactive");
                            });
                            $filterCountryOriginCountryElem.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });
                            $filterCountryOriginInput.val("ALL");

                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            $filterRegionOriginInput.val(dataName);

                            $('.countries-group.countries-origin[data-region_code="' + _this.attr("ID") + '"]').removeClass("inactive").addClass("active");
                        } else if (_this.hasClass("country")) {

                            $filterCountryOriginCountryElem.each(function () {
                                $(this).removeClass("active").addClass("inactive").attr("data-status", "inactive");
                            });

                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                            $filterCountryOriginInput.val(dataName);

                        }
                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {
                        if (_this.hasClass("region")) {
                        } else if (_this.hasClass("country")) {
                        }
                    }
                    // End Multiple
                    $filterRegionOriginInput.trigger("change");
                    $filterCountryOriginInput.trigger("change");
                })
                // End Elem Click
            },

            filterSetFormElem: function () {
                const $searchInput = $("#searchInput");

                const $filter = $("#filter");

                // Start Where
                const $where = $filter.find("#where");
                const $whereElem = $filter.find("#where .elem");
                const $whereFamilyGroup = $filter.find("#where .family-group");

                const $filterWhereAllInput = $("#filterWhereAllInput");
                const $filterWhereNameInput = $("#filterWhereNameInput");
                const $filterWhereDescriptionInput = $("#filterWhereDescriptionInput");
                const $filterWhereFamilyInput = $("#filterWhereFamilyInput");

                const $filterWhereFamilyMotherInput = $("#filterWhereFamilyMotherInput");
                const $filterWhereFamilyMotherMotherInput = $("#filterWhereFamilyMotherMotherInput");
                const $filterWhereFamilyMotherFatherInput = $("#filterWhereFamilyMotherFatherInput");
                const $filterWhereFamilyMotherMotherMotherInput = $("#filterWhereFamilyMotherMotherMotherInput");
                const $filterWhereFamilyMotherMotherFatherInput = $("#filterWhereFamilyMotherMotherFatherInput");
                const $filterWhereFamilyMotherFatherMotherInput = $("#filterWhereFamilyMotherFatherMotherInput");
                const $filterWhereFamilyMotherFatherFatherInput = $("#filterWhereFamilyMotherFatherFatherInput");
                const $filterWhereFamilyFatherInput = $("#filterWhereFamilyFatherInput");
                const $filterWhereFamilyFatherMotherInput = $("#filterWhereFamilyFatherMotherInput");
                const $filterWhereFamilyFatherFatherInput = $("#filterWhereFamilyFatherFatherInput");
                const $filterWhereFamilyFatherMotherMotherInput = $("#filterWhereFamilyFatherMotherMotherInput");
                const $filterWhereFamilyFatherMotherFatherInput = $("#filterWhereFamilyFatherMotherFatherInput");
                const $filterWhereFamilyFatherFatherMotherInput = $("#filterWhereFamilyFatherFatherMotherInput");
                const $filterWhereFamilyFatherFatherFatherInput = $("#filterWhereFamilyFatherFatherFatherInput");

                if ($filterWhereAllInput.val() === "active") {
                    $where.find(".filterWhereAll").removeClass("inactive").addClass("active");
                    $where.find(".filterWhereAll").attr("data-status", "active");
                } else {
                    $where.find(".filterWhereAll").removeClass("active").addClass("inactive");
                    $where.find(".filterWhereAll").attr("data-status", "inactive");
                }

                if ($filterWhereNameInput.val() === "active") {
                    $where.find(".filterWhereName").removeClass("inactive").addClass("active");
                    $where.find(".filterWhereName").attr("data-status", "active");
                } else {
                    $where.find(".filterWhereName").removeClass("active").addClass("inactive");
                    $where.find(".filterWhereName").attr("data-status", "inactive");
                }

                if ($filterWhereDescriptionInput.val() === "active") {
                    $where.find(".filterWhereDescription").removeClass("inactive").addClass("active");
                    $where.find(".filterWhereDescription").attr("data-status", "active");
                } else {
                    $where.find(".filterWhereDescription").removeClass("active").addClass("inactive");
                    $where.find(".filterWhereDescription").attr("data-status", "inactive");
                }

                if ($filterWhereFamilyInput.val() === "active") {
                    $where.find(".filterWhereFamily").removeClass("inactive").addClass("active");
                    $where.find(".filterWhereFamily").attr("data-status", "active");

                    // Start whereFamilyGroup
                    $whereFamilyGroup.removeClass("inactive").addClass("active");

                    if ($filterWhereFamilyMotherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyMother").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyMother").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyMother").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyMother").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyMotherMotherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMother").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMother").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMother").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMother").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyMotherFatherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFather").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFather").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFather").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFather").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyMotherMotherMotherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherMother").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherMother").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherMother").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherMother").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyMotherMotherFatherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherFather").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherFather").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherFather").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherMotherFather").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyMotherFatherMotherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherMother").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherMother").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherMother").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherMother").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyMotherFatherFatherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherFather").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherFather").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherFather").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyMotherFatherFather").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyFatherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyFather").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyFather").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyFather").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyFather").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyFatherMotherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMother").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMother").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMother").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMother").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyFatherFatherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFather").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFather").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFather").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFather").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyFatherMotherMotherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherMother").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherMother").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherMother").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherMother").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyFatherMotherFatherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherFather").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherFather").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherFather").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherMotherFather").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyFatherFatherMotherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherMother").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherMother").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherMother").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherMother").attr("data-status", "inactive");
                    }

                    if ($filterWhereFamilyFatherFatherFatherInput.val() === "active") {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherFather").removeClass("inactive").addClass("active");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherFather").attr("data-status", "active");
                    } else {
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherFather").removeClass("active").addClass("inactive");
                        $whereFamilyGroup.find(".filterWhereFamilyFatherFatherFather").attr("data-status", "inactive");
                    }
                    // End whereFamilyGroup
                } else {
                    $where.find(".filterWhereFamily").removeClass("active").addClass("inactive");
                    $where.find(".filterWhereFamily").attr("data-status", "inactive");

                    $whereFamilyGroup.removeClass("active").addClass("inactive");
                }
                // End Where

                // Start Price
                const $price = $filter.find("#price");
                const priceSlider = document.getElementById('price-slider');

                const $filterPriceMinInput = $("#filterPriceMinInput");
                const $filterPriceMaxInput = $("#filterPriceMaxInput");

                priceSlider.noUiSlider.updateOptions({
                    start: [$filterPriceMinInput.val(), $filterPriceMaxInput.val()]
                });
                // End Price

                // Start Category
                const $category = $filter.find("#category");
                const $categoryElem = $filter.find("#category .elem");

                const $filterCategoryInput = $("#filterCategoryInput");
                const $filterCategoryInputVal = JSON.parse($filterCategoryInput.val());

                $categoryElem.each(function () {
                    if ($filterCategoryInputVal.includes(parseInt($(this).attr("data-name")))) {
                        $(this).removeClass("inactive").addClass("active");
                        $(this).attr("data-status", "active");
                    } else {
                        $(this).removeClass("active").addClass("inactive");
                        $(this).attr("data-status", "inactive");
                    }
                });

                if ($filterCategoryInputVal.length === 1 && !$filterCategoryInputVal.includes(0)) {
                    loadSearch.searchFilterCategoryAjax();
                } else {
                }
                // End Category

                // Start Subcategory
                const $subcategory = $filter.find("#subcategory");
                const $subcategoryElem = $filter.find("#subcategory .elem");

                const $filterSubcategoryInput = $("#filterSubcategoryInput");
                const $filterSubcategoryInputVal = JSON.parse($filterSubcategoryInput.val());

                let eachRunSubcategory = true;
                $searchInput.on("focus", function () {
                    if (eachRunSubcategory === true) {
                        $.each($("#subcategory .elem"), function () {
                            if ($filterSubcategoryInputVal.includes(parseInt($(this).attr("data-name")))) {
                                $(this).removeClass("inactive").addClass("active");
                                $(this).attr("data-status", "active");
                            } else {
                                $(this).removeClass("active").addClass("inactive");
                                $(this).attr("data-status", "inactive");
                            }
                        });
                        eachRunSubcategory = false;
                    }
                });
                // End Subcategory

                // Start Gender
                const $gender = $filter.find("#gender");
                const $genderElem = $filter.find("#gender .elem");

                const $filterGenderInput = $("#filterGenderInput");
                const $filterGenderInputVal = JSON.parse($filterGenderInput.val());

                let eachRunGender = true;
                $searchInput.on("focus", function () {
                    if (eachRunGender === true) {
                        $.each($("#gender .elem"), function () {
                            if ($filterGenderInputVal.includes(parseInt($(this).attr("data-name"))) || $filterGenderInputVal.includes($(this).attr("data-name"))) {
                                $(this).removeClass("inactive").addClass("active");
                                $(this).attr("data-status", "active");
                            } else {
                                $(this).removeClass("active").addClass("inactive");
                                $(this).attr("data-status", "inactive");
                            }
                        });
                        eachRunGender = false;
                    }
                });
                // End Gender

                // Start Color
                const $color = $filter.find("#color");
                const $colorElem = $filter.find("#color .elem");

                const $filterColorInput = $("#filterColorInput");
                const $filterColorInputVal = JSON.parse($filterColorInput.val());

                let eachRunColor = true;
                $searchInput.on("focus", function () {
                    if (eachRunColor === true) {
                        $.each($("#color .elem"), function () {
                            if ($filterColorInputVal.includes(parseInt($(this).attr("data-name"))) || $filterColorInputVal.includes($(this).attr("data-name"))) {
                                $(this).removeClass("inactive").addClass("active");
                                $(this).attr("data-status", "active");
                            } else {
                                $(this).removeClass("active").addClass("inactive");
                                $(this).attr("data-status", "inactive");
                            }
                        });
                        eachRunColor = false;
                    }
                });
                // End Color

                // Start Be Used For
                const $beUsedFor = $filter.find("#beUsedFor");
                const $beUsedForElem = $filter.find("#beUsedFor .elem");

                const $filterBeUsedForInput = $("#filterBeUsedForInput");
                const $filterBeUsedForInputVal = JSON.parse($filterBeUsedForInput.val());

                let eachRunBeUsedFor = true;
                $searchInput.on("focus", function () {
                    if (eachRunBeUsedFor === true) {
                        $.each($("#beUsedFor .elem"), function () {
                            if ($filterBeUsedForInputVal.includes(parseInt($(this).attr("data-name"))) || $filterBeUsedForInputVal.includes($(this).attr("data-name"))) {
                                $(this).removeClass("inactive").addClass("active");
                                $(this).attr("data-status", "active");
                            } else {
                                $(this).removeClass("active").addClass("inactive");
                                $(this).attr("data-status", "inactive");
                            }
                        });
                        eachRunBeUsedFor = false;
                    }
                });
                // End Be Used For

                // Start Age
                const $age = $filter.find("#age");
                const ageSlider = document.getElementById('age-slider');

                const $filterAgeMinInput = $("#filterAgeMinInput");
                const $filterAgeMaxInput = $("#filterAgeMaxInput");

                let eachRunAge = true;
                $searchInput.on("focus", function () {
                    if (eachRunAge === true) {
                        ageSlider.noUiSlider.updateOptions({
                            start: [$filterAgeMinInput.val(), $filterAgeMaxInput.val()]
                        });
                        eachRunAge = false;
                    }
                });
                // End Age


                // Start Height
                const $height = $filter.find("#height");
                const heightSlider = document.getElementById('height-slider');

                const $filterHeightMinInput = $("#filterHeightMinInput");
                const $filterHeightMaxInput = $("#filterHeightMaxInput");

                let eachRunHeight = true;
                $searchInput.on("focus", function () {
                    if (eachRunHeight === true) {
                        heightSlider.noUiSlider.updateOptions({
                            start: [$filterHeightMinInput.val(), $filterHeightMaxInput.val()]
                        });
                        eachRunHeight = false;
                    }
                });
                // End Age

                // Start Country Residence
                const $countryResidence = $filter.find("#countryResidence");
                const $countryResidenceElem = $filter.find("#countryResidence .elem");
                const $countryResidenceGroup = $filter.find("#countryResidence .countries-group.countries-origin");

                const $filterRegionResidenceInput = $("#filterRegionResidenceInput");
                const $filterCountryResidenceInput = $("#filterCountryResidenceInput");

                $.each($("#countryResidence .elem.region"), function () {
                    if ($filterRegionResidenceInput.val().includes($(this).attr("data-name"))) {
                        $(this).removeClass("inactive").addClass("active");
                        $(this).attr("data-status", "active");

                        $('.countries-group.countries-residence[data-region_code="' + $(this).attr("ID") + '"]').removeClass("inactive").addClass("active");
                    } else {
                        $(this).removeClass("active").addClass("inactive");
                        $(this).attr("data-status", "inactive");
                    }
                });

                $.each($("#countryResidence .elem.country"), function () {
                    if ($filterCountryResidenceInput.val().includes($(this).attr("data-name"))) {
                        $(this).removeClass("inactive").addClass("active");
                        $(this).attr("data-status", "active");
                    } else {
                        $(this).removeClass("active").addClass("inactive");
                        $(this).attr("data-status", "inactive");
                    }
                });
                // End Country Residence

                // Start Country Origin
                const $countryOrigin = $filter.find("#countryOrigin");
                const $countryOriginElem = $filter.find("#countryOrigin .elem");
                const $countryOriginGroup = $filter.find("#countryOrigin .countries-group.countries-origin");

                const $filterRegionOriginInput = $("#filterRegionOriginInput");
                const $filterCountryOriginInput = $("#filterCountryOriginInput");

                $.each($("#countryOrigin .elem.region"), function () {
                    if ($filterRegionOriginInput.val().includes($(this).attr("data-name"))) {
                        $(this).removeClass("inactive").addClass("active");
                        $(this).attr("data-status", "active");

                        $('.countries-group.countries-origin[data-region_code="' + $(this).attr("ID") + '"]').removeClass("inactive").addClass("active");
                    } else {
                        $(this).removeClass("active").addClass("inactive");
                        $(this).attr("data-status", "inactive");
                    }
                });

                $.each($("#countryOrigin .elem.country"), function () {
                    if ($filterCountryOriginInput.val().includes($(this).attr("data-name"))) {
                        $(this).removeClass("inactive").addClass("active");
                        $(this).attr("data-status", "active");
                    } else {
                        $(this).removeClass("active").addClass("inactive");
                        $(this).attr("data-status", "inactive");
                    }
                });
                // End Country Origin
            },

            getFilterCountAjax: function () {
                const $searchBtn = $("#search #search-btn");
                const $searchBtnA = $("#search #search-btn a");
                const $searchBtnCountData = $searchBtn.find(".count-data");

                $("#filterOnlyOneCategoryId").val($("#filterCategoryInput").val());
                $("#filterOnlyOneSubcategoryId").val($("#filterSubcategoryInput").val());

                let filterFormData;
                let filterFormEncode;
                $.ajax({
                    type: "POST",
                    url: "/_get-filter-count",
                    contentType: "application/json",
                    data: JSON.stringify($("#filter-form").serializeObject()),
                    beforeSend: function (xhr) {
                    },
                    success: function (result, status, xhr) {
                        filterFormData = result['message']
                        filterFormEncode = result['encode']
                    },
                    complete: function (xhr, status) {
                        let statusCode = xhr['status'];

                        if (statusCode === 200) {
                            $searchBtnCountData.html(filterFormData['count']);
                            if (filterFormData['count'] !== 0) {
                                $searchBtn.removeClass("inactive").addClass("active");
                                let snapWindowLocationPathname = window.location.pathname.split("/");
                                if (snapWindowLocationPathname[1] === "snap") {
                                    $searchBtnA.attr("href", utility.getURL() + "/snap/1/" + filterFormEncode);
                                } else if (!snapWindowLocationPathname[1] || snapWindowLocationPathname[1] === "query") {
                                    $searchBtnA.attr("href", utility.getURL() + "/query/1/" + filterFormEncode);
                                } else {
                                    $searchBtnA.attr("href", utility.getURL() + "/query/1/" + filterFormEncode);
                                }

                                if ($("#dropdownFilterLinks").hasClass("show")) {
                                    document.getElementById('searchBtn').click();
                                }
                            } else {
                                $searchBtn.removeClass("active").addClass("inactive");
                            }
                        } else {
                        }
                    },
                    error: function (xhr, status, error) {
                    }
                });
            },

            getFilterCount: function () {
                const $searchInput = $("#searchInput");
                const $searchBtn = $("#search #search-btn");

                $("#filter-form :input").on("change", function () {
                    loadSearch.getFilterCountAjax();
                });

                $searchInput.on("focus", function () {
                    loadSearch.getFilterCountAjax();
                });

                $searchInput.on("keyup", function (event) {
                    event.stopPropagation();

                    const _this = $(this);
                    let query = _this.val();

                    loadSearch.getFilterCountAjax();
                });
            },

            dropdownFilterLink: function () {
                const $list = $("#list");
                const $dropdownFilterLinks = $list.find("#dropdownFilterLinks");
                const $dropdownFilterLinksItem = $dropdownFilterLinks.find("span.dropdown-item");

                const $filterOrderByPrice = $("#filterOrderByPrice");
                const $filterOrderByAge = $("#filterOrderByAge");
                const $filterOrderByHeight = $("#filterOrderByHeight");
                const $filterOrderByRating = $("#filterOrderByRating");

                function NoneOrderByInputVal() {
                    $filterOrderByPrice.val("None");
                    $filterOrderByAge.val("None");
                    $filterOrderByHeight.val("None");
                    $filterOrderByRating.val("None");
                }

                $dropdownFilterLinksItem.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataType = _this.attr("data-type");

                    if (dataType === "price-asc") {
                        NoneOrderByInputVal();
                        $filterOrderByPrice.val("asc");
                    } else if (dataType === "price-desc") {
                        NoneOrderByInputVal();
                        $filterOrderByPrice.val("desc");
                    } else if (dataType === "age-asc") {
                        NoneOrderByInputVal();
                        $filterOrderByAge.val("asc");
                    } else if (dataType === "age-desc") {
                        NoneOrderByInputVal();
                        $filterOrderByAge.val("desc");
                    } else if (dataType === "height-asc") {
                        NoneOrderByInputVal();
                        $filterOrderByHeight.val("asc");
                    } else if (dataType === "height-desc") {
                        NoneOrderByInputVal();
                        $filterOrderByHeight.val("desc");
                    } else if (dataType === "rating-asc") {
                        NoneOrderByInputVal();
                        $filterOrderByRating.val("asc");
                    } else if (dataType === "rating-desc") {
                        NoneOrderByInputVal();
                        $filterOrderByRating.val("desc");
                    }

                    if (dataType === "search-jump") {
                        const $search = $("#search .search");
                        const $searchInput = $search.find("#searchInput");

                        $("#dropdownFilterLink").removeClass("show").attr("aria-expanded", false);
                        $("#dropdownFilterLinks").removeClass("show").attr("style", "");

                        $("html, body").animate({scrollTop: 0}, 300);
                        setTimeout(
                            function () {
                                $searchInput.trigger("focus");
                            }, 300);
                    }

                    loadSearch.getFilterCountAjax();
                });
            },

            dropdownSnapView: function () {
                const $list = $("#list");
                const $dropdownSnapViews = $list.find("#dropdownSnapViews");
                const $dropdownSnapViewsItem = $dropdownSnapViews.find("span.dropdown-item");

                $dropdownSnapViewsItem.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataType = _this.attr("data-type");
                    let snapWindowLocationPathname = window.location.pathname.split("/");
                    let windowLocation = window.location.href;

                    if (dataType === "snap") {
                        if (snapWindowLocationPathname[1] === "query") {
                            windowLocation = windowLocation.replace("query", "snap");
                            window.location.href = windowLocation;
                        } else {
                            window.location.href = utility.getURL() + "/snap";
                        }
                    } else if (dataType === "list") {
                        if (snapWindowLocationPathname.length === 2) {
                            window.location.href = utility.getURL()
                        } else {
                            windowLocation = windowLocation.replace("snap", "query");
                            window.location.href = windowLocation;
                        }
                    } else {
                    }
                });
            },

            initializ: function () {
                loadSearch.searchInput();
                loadSearch.searchListIcon();
                loadSearch.searchFilterWhere();
                loadSearch.searchFilterPrice();
                loadSearch.searchFilterCategory();
                loadSearch.searchFilterSubcategory();
                loadSearch.searchFilterGender();
                loadSearch.searchFilterColor();
                loadSearch.searchFilterBeUsedFor();
                loadSearch.searchFilterAge();
                loadSearch.searchFilterCountryResidence();
                loadSearch.searchFilterCountryOrigin();
                loadSearch.filterSetFormElem();
                loadSearch.getFilterCount();
                loadSearch.dropdownFilterLink();
                loadSearch.dropdownSnapView();
            }

        };

        $(function () {
            loadSearch.initializ()
        });
    }
}

export let anlibreedersSearch = new AnlibreedersSearch();