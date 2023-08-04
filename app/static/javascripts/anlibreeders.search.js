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


                const $filterWhereElem = $filterWhere.find(".elem");

                const $filterWhereAll = $filterWhere.find(".filterWhereAll");
                const $filterWhereName = $filterWhere.find(".filterWhereName");
                const $filterWhereDescription = $filterWhere.find(".filterWhereDescription");


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

                        });

                        $filterWhereAll.each(function () {
                            $(this).removeClass("inactive").addClass("active").attr("data-status", "active");
                        });

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


                            $filterWhereAllInput.val("active");
                            $filterWhereNameInput.val("inactive");
                            $filterWhereDescriptionInput.val("inactive");
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


                    } else if (_this.hasClass("multiple") && _this.hasClass("active")) {

                        _this.removeClass("active").addClass("inactive").attr("data-status", "inactive");

                        if (dataName === "filterWhereName") {
                            $filterWhereNameInput.val("inactive");
                        }

                        if (dataName === "filterWhereDescription") {
                            $filterWhereDescriptionInput.val("inactive");
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

                        }
                    } else {
                        $subcategory.removeClass("active").addClass("inactive");
                        $gender.removeClass("active").addClass("inactive");
                        $color.removeClass("active").addClass("inactive");
                        $beUsedFor.removeClass("active").addClass("inactive");

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


            filterSetFormElem: function () {
                const $searchInput = $("#searchInput");

                const $filter = $("#filter");

                // Start Where
                const $where = $filter.find("#where");
                const $whereElem = $filter.find("#where .elem");

                const $filterWhereAllInput = $("#filterWhereAllInput");
                const $filterWhereNameInput = $("#filterWhereNameInput");
                const $filterWhereDescriptionInput = $("#filterWhereDescriptionInput");


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
            },

            // End Country Residence

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
            }
            ,

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
            }
            ,

            dropdownFilterLink: function () {
                const $list = $("#list");
                const $dropdownFilterLinks = $list.find("#dropdownFilterLinks");
                const $dropdownFilterLinksItem = $dropdownFilterLinks.find("span.dropdown-item");

                const $filterOrderByPrice = $("#filterOrderByPrice");
                const $filterOrderByRating = $("#filterOrderByRating");

                function NoneOrderByInputVal() {
                    $filterOrderByPrice.val("None");
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
            }
            ,

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
            }
            ,

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
                loadSearch.searchFilterCountryResidence();
                loadSearch.filterSetFormElem();
                loadSearch.getFilterCount();
                loadSearch.dropdownFilterLink();
                loadSearch.dropdownSnapView();
            }

        };

        $(function () {
                loadSearch.initializ()
            }
        )
    }
}

export let
    anlibreedersSearch = new AnlibreedersSearch();