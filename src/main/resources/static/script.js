/// <reference path="jquery-3.5.1.js"/>

function showAlert(alert) {
    $('#alert-container')
    .show()
    .empty()
    .append(`<div></div>`)
    .addClass(['alert',alert.alertClass])
    .append('<strong></strong>')
    .text(alert.alertText);
}

function showLoader(action) {
    action ? $('#loader').show() : $('#loader').hide();
}

function hidePreviewCard() {
    $('#preview-card').hide();
}
function hideAlert() {
    $('#alert-container').hide();
}

function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

$(function() {
    $('#link-gen-btn').on('click', (changeEvent) => {
        const inputURL = $('#url-input-control').val();
        if (!inputURL) {
            showAlert({
                alertClass: 'alert-danger',
                alertText: 'Please Enter The URL First'
            });
        }
        else {
            hideAlert();
            hidePreviewCard();
            showLoader(true);
            $('#link-gen-btn').text('Generating Preview...').addClass('working');
            const requestURL = `http://localhost:8080/link-preview?url=${inputURL}`;
            $.ajax({
                url: requestURL,
                method: 'GET',
            }).then(res => {
                console.log(res)
                const $previewCard = $('#preview-card');
                $previewCard.show()
                if (res.imageUrl) {
                    $previewCard.find('.image-container').empty().append($('<img>').attr('src',res.imageUrl));
                }else {
                    $previewCard.find('.image-container').empty().append($('<p></p>').text('Preview Image Not Available').addClass('font-weight-bold text-center'));
                }
                $previewCard.find('.preview-title').text(res.title);
                $previewCard.find('.preview-url').text(res.url);
                $('#link-gen-btn').text('Generate Preview').removeClass('working');
            }).catch(err => {

            }).always(() => {
                showLoader(false);
            });
        }

    });
});