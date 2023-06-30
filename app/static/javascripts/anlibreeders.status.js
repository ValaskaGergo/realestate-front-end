import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersStatus {
    loadAnlibreedersStatus() {
        const loadStatus = {

            uptime: function () {

                if ($(".container.status").hasClass("status-page")) {

                    let statusData;
                    $.ajax({
                        type: "POST",
                        url: "/_status",
                        contentType: "application/json",
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            statusData = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            let days,
                                hours,
                                minutes,
                                seconds;

                            if (statusCode === 200) {
                                days = parseInt(statusData['uptime']['days']);
                                hours = parseInt(statusData['uptime']['hours']);
                                minutes = parseInt(statusData['uptime']['minutes']);
                                seconds = parseInt(statusData['uptime']['seconds']);

                                $(".status-page .uptime-data").attr("data-days", days);
                                $(".status-page .uptime-data").attr("data-hours", hours);
                                $(".status-page .uptime-data").attr("data-minutes", minutes);
                                $(".status-page .uptime-data").attr("data-seconds", seconds);
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                }

            },

            linePercent: function () {
                $(".status-page .order3 .line").each(function () {
                    let dataDatetime = $(this).attr("data-datetime");
                    let foo = "<span class='datetime'>" + utility.getDateTimeLL(dataDatetime) + "</span> <br> <span class='percent'>100%</span>"
                    $(this).attr("data-bs-title", foo)
                });

                $('[data-bs-toggle="tooltip"]').tooltip();
            },

            initializ: function () {
                loadStatus.uptime();
                loadStatus.linePercent();
            }

        };

        $(function () {
            loadStatus.initializ()
        });
    }
}

export let anlibreedersStatus = new AnlibreedersStatus();