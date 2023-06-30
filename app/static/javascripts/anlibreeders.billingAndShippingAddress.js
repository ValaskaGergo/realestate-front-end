import AnlibreedersUtility from './utilities/anlibreeders.utility'
import {AsYouType, parsePhoneNumberFromString} from "libphonenumber-js";

const utility = new AnlibreedersUtility();

class AnlibreedersBillingAndShippingAddress {
    loadAnlibreedersBillingAndShippingAddress() {
        const loadBillingAndShippingAddress = {

            billingAndShippingAddress: function () {

                // Start Radio Render
                $("input[class='billingAddressIsCompanyPerson']").checkbox();
                $("input[class='billingAddressIsCompanyCompany']").checkbox();

                $("input[class='billingAddressIsShippingAddressYes']").checkbox();
                $("input[class='billingAddressIsShippingAddressNo']").checkbox();
                // End Radio Render

                // Start Select Render
                let $billingAddressCountrySelect = $('#billing-address-form .billingAddressCountrySelect');
                $billingAddressCountrySelect.selectpicker({
                    liveSearch: true,
                    liveSearchNormalize: true
                });
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    $billingAddressCountrySelect.selectpicker('mobile');
                }

                let $shippingAddressCountrySelect = $('#billing-address-form .shippingAddressCountrySelect');
                $shippingAddressCountrySelect.selectpicker({
                    liveSearch: true
                });
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    $shippingAddressCountrySelect.selectpicker('mobile');
                }

                let $billingAddressCountryInputVal = $("#billing-address-form #billingAddressCountry").val();

                $billingAddressCountrySelect.val($billingAddressCountryInputVal);
                $billingAddressCountrySelect.selectpicker('refresh');

                $shippingAddressCountrySelect.val($billingAddressCountryInputVal);
                $shippingAddressCountrySelect.selectpicker('refresh');


                // End Select Render

                // Start Is Company Radio
                $("body").on("change", "#billing-address-form #billingAddressIsCompanyPerson", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#billing-address-form .billingAddressCompanyShow").removeClass("d-block").addClass("d-none");
                        $("#billing-address-form .shippingAddressCompanyShow").removeClass("d-block").addClass("d-none");
                        $("#billing-address-form #billingAddressIsCompany").val("False");
                        $("#billing-address-form #shippingAddressIsCompany").val("False");

                        $billingAddressCountrySelect.prop('disabled', false);
                        $billingAddressCountrySelect.selectpicker('refresh');
                        $("#billing-address-form #billingAddressCompanyName").val("");
                        $("#billing-address-form #billingAddressCompanyTax").val("");
                        $("#billing-address-form .billing-tax-country-code").addClass("d-none");
                        $("#billing-address-form .billing-tax-country-code").text("");
                    }
                });

                $("body").on("change", "#billing-address-form #billingAddressIsCompanyCompany", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#billing-address-form .billingAddressCompanyShow").removeClass("d-none").addClass("d-block");
                        $("#billing-address-form .shippingAddressCompanyShow").removeClass("d-none").addClass("d-block");
                        $("#billing-address-form #billingAddressIsCompany").val("True");
                        $("#billing-address-form #shippingAddressIsCompany").val("True");
                    }
                });
                // End Is Company Radio

                // Start Is Shipping Radio
                $("body").on("change", "#billing-address-form #billingAddressIsShippingAddressYes", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#billing-address-form .shippingAddress").removeClass("d-block").addClass("d-none");
                        $("#billing-address-form #billingAddressIsShipping").val("True");
                    }
                });

                $("body").on("change", "#billing-address-form #billingAddressIsShippingAddressNo", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#billing-address-form .shippingAddress").removeClass("d-none").addClass("d-block");
                        $("#billing-address-form #billingAddressIsShipping").val("False");
                    }
                });
                // End Is Shipping Radio

                // Start Country Select
                $billingAddressCountrySelect.on('changed.bs.select', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataCountryCode = $(event['target'][clickedIndex]).attr("data-country-code");
                    let dataCurrency = $(event['target'][clickedIndex]).attr("data-currency");
                    $("#billing-address-form #billingAddressCountry").val(dataCountryCode);
                    $("#billing-address-form #billingAddressCurrency").val(dataCurrency);

                    $shippingAddressCountrySelect.val(dataCountryCode);
                    $shippingAddressCountrySelect.selectpicker('refresh');
                    $("#billing-address-form #billingAddressCountry").val(dataCountryCode);
                    $("#billing-address-form #shippingAddressCountry").val(dataCountryCode);
                    $("#billing-address-form #shippingAddressCurrency").val(dataCurrency);
                });

                $shippingAddressCountrySelect.on('changed.bs.select', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataCountryCode = $(event['target'][clickedIndex]).attr("data-country-code");
                    $("#billing-address-form #shippingAddressCountry").val(dataCountryCode);
                });
                // End Country Select

                // Start Phone Formatter
                $("body").on("keyup change paste", "#billing-address-form #billingAddressPhone", function (event) {
                    let _this = $(this);
                    let data = _this.val();

                    let $phoneCountryCode = $("#billing-address-form .billing-phone-country-code");
                    let $billingAddressPhoneInput = $("#billing-address-form #billingAddressPhone");

                    let asYouTypePhone = new AsYouType();
                    asYouTypePhone.input(data)

                    if (asYouTypePhone.country !== undefined) {
                        $phoneCountryCode.removeClass("d-none");
                        $phoneCountryCode.text(asYouTypePhone.country);

                        let phoneNumber = parsePhoneNumberFromString(data, asYouTypePhone.country);
                        if (phoneNumber) {
                            $billingAddressPhoneInput.val(phoneNumber.formatInternational())
                        }
                    } else {
                        $phoneCountryCode.addClass("d-none");
                        $phoneCountryCode.text("");
                    }
                });
                $("#billing-address-form #billingAddressPhone").trigger("change");

                $("body").on("keyup change paste", "#billing-address-form #shippingAddressPhone", function (event) {
                    let _this = $(this);
                    let data = _this.val();

                    let $phoneCountryCode = $("#billing-address-form .shipping-phone-country-code");
                    let $shippingAddressPhoneInput = $("#billing-address-form #shippingAddressPhone");

                    let asYouTypePhone = new AsYouType();
                    asYouTypePhone.input(data)

                    if (asYouTypePhone.country !== undefined) {
                        $phoneCountryCode.removeClass("d-none");
                        $phoneCountryCode.text(asYouTypePhone.country);

                        let phoneNumber = parsePhoneNumberFromString(data, asYouTypePhone.country);
                        if (phoneNumber) {
                            $shippingAddressPhoneInput.val(phoneNumber.formatInternational())
                        }
                    } else {
                        $phoneCountryCode.addClass("d-none");
                        $phoneCountryCode.text("");
                    }
                });
                $("#billing-address-form #shippingAddressPhone").trigger("change");
                // End Phone Formatter

                // Start Tax Number Country
                $("body").on("change paste", "#billing-address-form #billingAddressCompanyTax", function (event) {
                    let _this = $(this);
                    let data = _this.val();

                    utility.getEuTaxNumberValidation(data)
                        .then(data => {
                            let $taxCountryCode = $("#billing-address-form .billing-tax-country-code");
                            let $billingAddressCompanyName = $("#billing-address-form #billingAddressCompanyName");
                            let $billingAddressCountryInput = $("#billing-address-form #billingAddressCountry");
                            let $shippingAddressCountryInput = $("#billing-address-form #shippingAddressCountry");

                            if (data['valid'] === true) {
                                $taxCountryCode.removeClass("d-none");
                                $taxCountryCode.text(data['country_code']);
                                $billingAddressCompanyName.val(data['company_name']);

                                $billingAddressCountrySelect.val(data['country_code']);
                                $billingAddressCountrySelect.prop('disabled', true);
                                $billingAddressCountrySelect.selectpicker('refresh');
                                let dataCurrency = $billingAddressCountrySelect.find(':selected').attr('data-currency');
                                $("#billing-address-form #billingAddressCurrency").val(dataCurrency);
                                $("#billing-address-form #shippingAddressCurrency").val(dataCurrency);

                                $shippingAddressCountrySelect.val(data['country_code']);
                                $shippingAddressCountrySelect.selectpicker('refresh');

                                $billingAddressCountryInput.val(data['country_code']);
                                $shippingAddressCountryInput.val(data['country_code']);

                            } else {
                                $taxCountryCode.addClass("d-none");
                                $taxCountryCode.text("");
                                // $billingAddressCompanyName.val("");

                                $billingAddressCountrySelect.prop('disabled', false);
                                $billingAddressCountrySelect.selectpicker('refresh');
                            }

                        });
                });
                $("#billing-address-form #billingAddressCompanyTax").trigger("change");

                $("body").on("change paste", "#billing-address-form #shippingAddressCompanyTax", function (event) {
                    let _this = $(this);
                    let data = _this.val();

                    utility.getEuTaxNumberValidation(data)
                        .then(data => {
                            let $taxCountryCode = $("#billing-address-form .shipping-tax-country-code");
                            let $billingAddressCompanyName = $("#billing-address-form #shippingAddressCompanyName");

                            if (data['valid'] === true) {
                                $taxCountryCode.removeClass("d-none");
                                $taxCountryCode.text(data['country_code']);
                                $billingAddressCompanyName.val(data['company_name']);
                            } else {
                                $taxCountryCode.addClass("d-none");
                                $taxCountryCode.text("");
                                $billingAddressCompanyName.val("");
                            }

                        });
                });
                $("#billing-address-form #shippingAddressCompanyTax").trigger("change");
                // End Tax Number Country

                // Start AJAX Post
                $("body").on("click", "#billing-address-form #billing-address-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let billingAndShippingFormData;

                    $.ajax({
                        type: "POST",
                        url: "/_billing-and-shipping-address",
                        contentType: "application/json",
                        data: JSON.stringify($("#billing-address-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            billingAndShippingFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $billingAddressForm = $("#billing-address-form");
                                let $billingAddressFormInputError = $("#billing-address-form .input-error");

                                $billingAddressFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $billingAddressForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        // window.location.href = utility.getURL() + "/billing-and-shipping-address";
                                        window.location.href = utility.getURL() + window.location.pathname;
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $billingAddressForm = $("#billing-address-form");
                                        $billingAddressForm.find(".form-alert-danger").removeClass("d-none");

                                        $("html, body").animate({scrollTop: 0}, 500);

                                        // Start Billing
                                        if (result['message']['message']['billing_first_name']) {
                                            $billingAddressForm.find(".billing-address-first-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-first-name-error span").text("");
                                            $billingAddressForm.find(".billing-address-first-name-error span").attr("data-i18n", result['message']['message']['billing_first_name']);
                                            $billingAddressForm.find(".billing-address-first-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-first-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-first-name-error span").text("");
                                            $billingAddressForm.find(".billing-address-first-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_last_name']) {
                                            $billingAddressForm.find(".billing-address-last-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-last-name-error span").text("");
                                            $billingAddressForm.find(".billing-address-last-name-error span").attr("data-i18n", result['message']['message']['billing_last_name']);
                                            $billingAddressForm.find(".billing-address-last-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-last-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-last-name-error span").text("");
                                            $billingAddressForm.find(".billing-address-last-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_phone']) {
                                            $billingAddressForm.find(".billing-address-phone-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-phone-error span").text("");
                                            $billingAddressForm.find(".billing-address-phone-error span").attr("data-i18n", result['message']['message']['billing_phone']);
                                            $billingAddressForm.find(".billing-address-phone-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-phone-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-phone-error span").text("");
                                            $billingAddressForm.find(".billing-address-phone-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_email']) {
                                            $billingAddressForm.find(".billing-address-email-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-email-error span").text("");
                                            $billingAddressForm.find(".billing-address-email-error span").attr("data-i18n", result['message']['message']['billing_email']);
                                            $billingAddressForm.find(".billing-address-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-email-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-email-error span").text("");
                                            $billingAddressForm.find(".billing-address-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_company_name']) {
                                            $billingAddressForm.find(".billing-address-company-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-company-name-error span").text("");
                                            $billingAddressForm.find(".billing-address-company-name-error span").attr("data-i18n", result['message']['message']['billing_company_name']);
                                            $billingAddressForm.find(".billing-address-company-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-company-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-company-name-error span").text("");
                                            $billingAddressForm.find(".billing-address-company-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_company_tax']) {
                                            $billingAddressForm.find(".billing-address-company-tax-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-company-tax-error span").text("");
                                            $billingAddressForm.find(".billing-address-company-tax-error span").attr("data-i18n", result['message']['message']['billing_company_tax']);
                                            $billingAddressForm.find(".billing-address-company-tax-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-company-tax-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-company-tax-error span").text("");
                                            $billingAddressForm.find(".billing-address-company-tax-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_country']) {
                                            $billingAddressForm.find(".billing-address-country-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-country-error span").text("");
                                            $billingAddressForm.find(".billing-address-country-error span").attr("data-i18n", result['message']['message']['billing_country']);
                                            $billingAddressForm.find(".billing-address-country-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-country-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-country-error span").text("");
                                            $billingAddressForm.find(".billing-address-country-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_zip_number']) {
                                            $billingAddressForm.find(".billing-address-zip-number-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-zip-number-error span").text("");
                                            $billingAddressForm.find(".billing-address-zip-number-error span").attr("data-i18n", result['message']['message']['billing_zip_number']);
                                            $billingAddressForm.find(".billing-address-zip-number-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-zip-number-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-zip-number-error span").text("");
                                            $billingAddressForm.find(".billing-address-zip-number-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_place']) {
                                            $billingAddressForm.find(".billing-address-place-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-place-error span").text("");
                                            $billingAddressForm.find(".billing-address-place-error span").attr("data-i18n", result['message']['message']['billing_place']);
                                            $billingAddressForm.find(".billing-address-place-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-place-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-place-error span").text("");
                                            $billingAddressForm.find(".billing-address-place-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['billing_street']) {
                                            $billingAddressForm.find(".billing-address-street-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-street-error span").text("");
                                            $billingAddressForm.find(".billing-address-street-error span").attr("data-i18n", result['message']['message']['billing_street']);
                                            $billingAddressForm.find(".billing-address-street-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".billing-address-street-error span").removeData("i18n");
                                            $billingAddressForm.find(".billing-address-street-error span").text("");
                                            $billingAddressForm.find(".billing-address-street-error").addClass("d-none");
                                            $('body').i18n();
                                        }
                                        // End Billing

                                        // Start Shipping
                                        if (result['message']['message']['shipping_first_name']) {
                                            $billingAddressForm.find(".shipping-address-first-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-first-name-error span").text("");
                                            $billingAddressForm.find(".shipping-address-first-name-error span").attr("data-i18n", result['message']['message']['shipping_first_name']);
                                            $billingAddressForm.find(".shipping-address-first-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-first-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-first-name-error span").text("");
                                            $billingAddressForm.find(".shipping-address-first-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_last_name']) {
                                            $billingAddressForm.find(".shipping-address-last-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-last-name-error span").text("");
                                            $billingAddressForm.find(".shipping-address-last-name-error span").attr("data-i18n", result['message']['message']['shipping_last_name']);
                                            $billingAddressForm.find(".shipping-address-last-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-last-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-last-name-error span").text("");
                                            $billingAddressForm.find(".shipping-address-last-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_phone']) {
                                            $billingAddressForm.find(".shipping-address-phone-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-phone-error span").text("");
                                            $billingAddressForm.find(".shipping-address-phone-error span").attr("data-i18n", result['message']['message']['shipping_phone']);
                                            $billingAddressForm.find(".shipping-address-phone-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-phone-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-phone-error span").text("");
                                            $billingAddressForm.find(".shipping-address-phone-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_email']) {
                                            $billingAddressForm.find(".shipping-address-email-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-email-error span").text("");
                                            $billingAddressForm.find(".shipping-address-email-error span").attr("data-i18n", result['message']['message']['shipping_email']);
                                            $billingAddressForm.find(".shipping-address-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-email-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-email-error span").text("");
                                            $billingAddressForm.find(".shipping-address-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_company_name']) {
                                            $billingAddressForm.find(".shipping-address-company-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-company-name-error span").text("");
                                            $billingAddressForm.find(".shipping-address-company-name-error span").attr("data-i18n", result['message']['message']['shipping_company_name']);
                                            $billingAddressForm.find(".shipping-address-company-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-company-name-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-company-name-error span").text("");
                                            $billingAddressForm.find(".shipping-address-company-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_country']) {
                                            $billingAddressForm.find(".shipping-address-country-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-country-error span").text("");
                                            $billingAddressForm.find(".shipping-address-country-error span").attr("data-i18n", result['message']['message']['shipping_country']);
                                            $billingAddressForm.find(".shipping-address-country-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-country-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-country-error span").text("");
                                            $billingAddressForm.find(".shipping-address-country-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_zip_number']) {
                                            $billingAddressForm.find(".shipping-address-zip-number-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-zip-number-error span").text("");
                                            $billingAddressForm.find(".shipping-address-zip-number-error span").attr("data-i18n", result['message']['message']['shipping_zip_number']);
                                            $billingAddressForm.find(".shipping-address-zip-number-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-zip-number-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-zip-number-error span").text("");
                                            $billingAddressForm.find(".shipping-address-zip-number-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_place']) {
                                            $billingAddressForm.find(".shipping-address-place-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-place-error span").text("");
                                            $billingAddressForm.find(".shipping-address-place-error span").attr("data-i18n", result['message']['message']['shipping_place']);
                                            $billingAddressForm.find(".shipping-address-place-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-place-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-place-error span").text("");
                                            $billingAddressForm.find(".shipping-address-place-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['shipping_street']) {
                                            $billingAddressForm.find(".shipping-address-street-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-street-error span").text("");
                                            $billingAddressForm.find(".shipping-address-street-error span").attr("data-i18n", result['message']['message']['shipping_street']);
                                            $billingAddressForm.find(".shipping-address-street-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $billingAddressForm.find(".shipping-address-street-error span").removeData("i18n");
                                            $billingAddressForm.find(".shipping-address-street-error span").text("");
                                            $billingAddressForm.find(".shipping-address-street-error").addClass("d-none");
                                            $('body').i18n();
                                        }
                                        // End Billing

                                    }
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });
                });
                // End AJAX Post
            },

            initializ: function () {
                loadBillingAndShippingAddress.billingAndShippingAddress()
            }

        };

        $(function () {
            loadBillingAndShippingAddress.initializ()
        });
    }
}

export let anlibreedersBillingAndShippingAddress = new AnlibreedersBillingAndShippingAddress();