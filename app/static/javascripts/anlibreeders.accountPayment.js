class AnlibreedersAccountPayment {
    loadAnlibreedersAccountPayment() {
        const loadAccountPayment = {

            monthlySwitch: function () {
                const $accountPaymentMonthlySwitch = $("#accountPaymentMonthlySwitch");
                const $accountPaymentMonthlySwitchButton = $accountPaymentMonthlySwitch.find("button");

                const $monthly1Card = $("#monthly1-card");
                const $monthly3Card = $("#monthly3-card");
                const $yearly1Card = $("#yearly1-card");

                $accountPaymentMonthlySwitchButton.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataType = _this.attr("data-type");

                    $.each($accountPaymentMonthlySwitchButton, function (index, elem) {
                        $(elem).removeClass("active");
                        _this.addClass("active");
                    });

                    if (dataType === "monthly1") {
                        $monthly3Card.addClass("d-none");
                        $yearly1Card.addClass("d-none");
                        $monthly1Card.removeClass("d-none");
                    } else if (dataType === "monthly3") {
                        $monthly1Card.addClass("d-none");
                        $yearly1Card.addClass("d-none");
                        $monthly3Card.removeClass("d-none");
                    } else if (dataType === "yearly1") {
                        $monthly1Card.addClass("d-none");
                        $monthly3Card.addClass("d-none");
                        $yearly1Card.removeClass("d-none");
                    }

                });
            },

            checkBox: function () {
                $("input[class='accountPaymentBarion']").checkbox();
                $("input[class='accountPaymentPayPal']").checkbox();
            },

            accountPaymentData: function () {
                $("body").on("click", "#account-payment-form .account-payment-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let accountPaymentDataObject = {}
                    let dataAdminSettingsId = parseInt(_this.attr("data-admin-settings-id"));

                    let $accountPaymentdataInput = $("#account-payment-form #accountPaymentDataInput");
                    let $accountPaymentBarionRadio = $("#account-payment-form #accountPaymentRadio #accountPaymentBarion");
                    let $accountPaymentPayPalRadio = $("#account-payment-form #accountPaymentRadio #accountPaymentPayPal");

                    if ($accountPaymentBarionRadio.is(':checked')) {
                        accountPaymentDataObject.payment = "barion";
                    }

                    if ($accountPaymentPayPalRadio.is(':checked')) {
                        accountPaymentDataObject.payment = "paypal";
                    }

                    accountPaymentDataObject.admin_settings_id = dataAdminSettingsId;

                    $accountPaymentdataInput.val(JSON.stringify(accountPaymentDataObject));

                    let redirectData;
                    $.ajax({
                        type: "POST",
                        url: "/_account-payment",
                        contentType: "application/json",
                        data: JSON.stringify($("#account-payment-form").serializeObject()),
                        beforeSend: function (xhr) {
                            $("#account-payment-form .account-payment-form-button").attr('disabled', true);
                            $("#account-payment-form .account-payment-form-button").addClass("action");
                            $("#accountPaymentRadio").addClass("pointer-events-none");

                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            redirectData = result;
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                setTimeout(
                                    function () {
                                        if (redirectData['payment'] === "barion") {
                                            window.location.replace(redirectData['message']['GatewayUrl']);
                                        }
                                        if (redirectData['payment'] === "paypal") {
                                            window.location.replace(redirectData['url']);
                                        }
                                    }, 10);
                            } else {
                                $("#account-payment-form .account-payment-form-button").attr('disabled', false);
                                $("#account-payment-form .account-payment-form-button").removeClass("action");
                                $("#accountPaymentRadio").removeClass("pointer-events-none");

                                //$("body").css({"filter": "grayscale(0%)"});
                                $("#post-loader").toggleClass("inactive active");
                                $("body").removeAttr("style");
                            }
                        },
                        error: function (xhr, status, error) {
                            $("#account-payment-form .account-payment-form-button").attr('disabled', false);
                            $("#account-payment-form .account-payment-form-button").removeClass("action");
                            $("#accountPaymentRadio").removeClass("pointer-events-none");

                            //$("body").css({"filter": "grayscale(0%)"});
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                        }
                    });
                });
            },

            paymentStatusInfo: function () {
                let dataBarionPaymentIdStatus = $(".accountPayment #barion-payment-id-status").attr("data-barion-payment-id-status");
                let dataBarionPaymentId = $(".accountPayment #barion-payment-id-status").attr("data-barion-payment-id");

                let dataPayPalPaymentIdStatus = $(".accountPayment #paypal-payment-id-status").attr("data-paypal-payment-id-status");
                let dataPayPalPaymentId = $(".accountPayment #paypal-payment-id-status").attr("data-paypal-payment-id");

                if (dataBarionPaymentIdStatus === "True") {
                    let barionPaymentStatusIdData;
                    $.ajax({
                        type: "POST",
                        url: "/_barion-payment-id-status",
                        contentType: "application/json",
                        data: JSON.stringify({"payment_id": dataBarionPaymentId}),
                        beforeSend: function (xhr) {
                            if (dataBarionPaymentIdStatus === "True") {
                            }
                        },
                        success: function (result, status, xhr) {
                            barionPaymentStatusIdData = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let paymentStatus = barionPaymentStatusIdData['Status'];

                                if (paymentStatus === "Canceled") {
                                    $("#account-payment-form .account-payment-form-button").removeClass("disabled");
                                    $(".container .payment-status-canceled").removeClass("d-none");
                                }

                                if (paymentStatus === "Succeeded") {
                                    $(".container .payment-status-succeeded").removeClass("d-none");

                                    $("#account-payment-form .account-payment-form-button").attr('disabled', true);
                                    $("#account-payment-form .account-payment-form-button").addClass("action");
                                    $("#accountPaymentRadio").addClass("pointer-events-none");
                                    $(".container.accountPayment").css({"filter": "grayscale(100%)"});
                                    $(".alert.alert-payment-danger").hide();

                                }
                            } else {
                                $("#account-payment-form .account-payment-form-button").removeClass("disabled");
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                }

                if (dataPayPalPaymentIdStatus === "True") {
                    let payPalPaymentStatusIdData;

                    $.ajax({
                        type: "POST",
                        url: "/_paypal-payment-id-status",
                        contentType: "application/json",
                        data: JSON.stringify({"payment_id": dataPayPalPaymentId}),
                        beforeSend: function (xhr) {
                            if (dataBarionPaymentIdStatus === "True") {
                            }
                        },
                        success: function (result, status, xhr) {
                            payPalPaymentStatusIdData = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let paymentStatus = payPalPaymentStatusIdData['status'];

                                if (paymentStatus === "CREATED") {
                                    $("#account-payment-form .account-payment-form-button").removeClass("disabled");
                                    $(".container .payment-status-canceled").removeClass("d-none");
                                }

                                if (paymentStatus === "APPROVED") {
                                    $(".container .payment-status-succeeded").removeClass("d-none");

                                    $("#account-payment-form .account-payment-form-button").attr('disabled', true);
                                    $("#account-payment-form .account-payment-form-button").addClass("action");
                                    $("#accountPaymentRadio").addClass("pointer-events-none");
                                    $(".container.accountPayment").css({"filter": "grayscale(100%)"});
                                    $(".alert.alert-payment-danger").hide();

                                }
                            } else {
                                $("#account-payment-form .account-payment-form-button").removeClass("disabled");
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                }
            },

            initializ: function () {
                loadAccountPayment.monthlySwitch();
                loadAccountPayment.checkBox();
                loadAccountPayment.accountPaymentData();
                loadAccountPayment.paymentStatusInfo();
            }

        };

        $(function () {
            loadAccountPayment.initializ();
        });
    }
}

export let anlibreedersAccountPayment = new AnlibreedersAccountPayment();