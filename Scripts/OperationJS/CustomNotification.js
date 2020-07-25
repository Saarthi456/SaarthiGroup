/* ------------------------------------------------------------------------------
*
*  # Noty and jGrowl notifications
*
*  Specific JS code additions for components_notifications_other.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */

$(function () {


    // Noty plugin
    // ------------------------------

    var notes = [];

    // Text options
    notes['alert'] = 'Best check yo self, you\'re not looking too good.';
    notes['error'] = 'Change a few things up and try submitting again.';
    notes['success'] = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning'] = 'Warning! Best check yo self, you\'re not looking too good.';
    notes['confirm'] = 'Do you want to continue?';

    // Initialize
    $('.noty-runner').click(function () {
        var self = $(this);
        console.log(self.data('type') + " typed call");
        noty({
            width: 200,
            text: notes[self.data('type')],
            type: self.data('type'),
            dismissQueue: true,
            timeout: 4000,
            layout: self.data('layout'),
            buttons: (self.data('type') != 'confirm') ? false : [
                {
                    addClass: 'btn btn-primary btn-xs',
                    text: 'Ok',
                    onClick: function ($noty) { //this = button element, $noty = $noty element
                        $noty.close();
                        noty({
                            force: true,
                            text: 'You clicked "Ok" button',
                            type: 'success',
                            layout: self.data('layout')
                        });
                    }
                },
                {
                    addClass: 'btn btn-danger btn-xs',
                    text: 'Cancel',
                    onClick: function ($noty) {
                        $noty.close();
                        noty({
                            force: true,
                            text: 'You clicked "Cancel" button',
                            type: 'error',
                            layout: self.data('layout')
                        });
                    }
                }
            ]
        });
        return false;
    });



    CustomNotification('', '');
});


function CustomNotification(_Type, _Layout, _Msg, _Width, _Timeout) {
    
    var notes = [];

    // Text options
    notes['alert'] = 'Best check yo self, you\'re not looking too good.';
    notes['error'] = 'Opps! somethig went wrong.';
    notes['success'] = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning'] = 'Warning! Best check yo self, you\'re not looking too good.';
    notes['confirm'] = 'Do you want to continue?';

    if (_Type == '' && _Layout == '')
        return;
    noty({
        width: _Width == undefined ? 100 : _Width,
        text: _Msg == undefined ? notes[_Type] : _Msg,
        type: _Type,
        dismissQueue: true,
        timeout: _Timeout == undefined ? 4000 : _Timeout,
        layout: _Layout,
        buttons: (_Type != 'confirm') ? false : [
            {
                addClass: 'btn btn-primary btn-xs',
                text: 'Ok',
                onClick: function ($noty) { //this = button element, $noty = $noty element
                    $noty.close();
                    noty({
                        force: true,
                        text: 'You clicked "Ok" button',
                        type: 'success',
                        layout: _Layout
                    });
                }
            },
            {
                addClass: 'btn btn-danger btn-xs',
                text: 'Cancel',
                onClick: function ($noty) {
                    $noty.close();
                    noty({
                        force: true,
                        text: 'You clicked "Cancel" button',
                        type: 'error',
                        layout: _Layout
                    });
                }
            }
        ]
    });
    return false;
}
