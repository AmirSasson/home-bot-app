var userName = 'Guest';
var getSession = function () {
    $.get('/.auth/me').done(d => {
        let claims = [];
        claims = d[0].user_claims;
        userName = claims.find(e => e.typ == 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname').val;
        $('#user-name').text(userName);

    })
}
getSession();

var stream = '';
function connectVid() {
    $.post('/api/commands/start-cam')
        .done(res => {
            stream = res.stream;
            console.log(`connecting to stream: [${stream}]`)
            var canvas = document.getElementById('video-canvas');
            $("#stream-start-btn").hide();
            $("#stream-canvas-container").show();
            var player = new JSMpeg.Player(stream, { canvas: canvas });
        });
}

function stopCam() {
    $.post('/api/commands/stop-cam')
        .done(res => {
            $("#stream-start-btn").show();
            $("#stream-canvas-container").hide();
        });
}

var say = function () {
    $.post('/api/commands/speak', { msg: $("#say-text").val(), by: userName })
        .done(d => $("#say-text").val(''));
}


$(document).ready(function () {
    var joystickView = new JoystickView(250, function (callbackView) {
        $("#joystickContent").append(callbackView.render().el);
        setTimeout(function () {
            callbackView.renderSprite();
        }, 0);
    });


    var move = { speed_left: 0, speed_right: 0 };
    joystickView.bind("move", function (coor) {
        console.log(coor);
        let result = { speed_left: 1, speed_right: 1 };
        const MAX_JOYSTICK_RANGE = 1;
        let x = coor.x;
        let y = coor.y;

        x *= -1;
        let v = (MAX_JOYSTICK_RANGE - Math.abs(x)) * (y / MAX_JOYSTICK_RANGE) + y;
        let w = (MAX_JOYSTICK_RANGE - Math.abs(y)) * (x / MAX_JOYSTICK_RANGE) + x;
        result.speed_right = ((v + w) / 2).toFixed(2);
        result.speed_left = ((v - w) / 2).toFixed(2);;
        ;
        if (Math.abs(result.speed_right) < 0.3)
            result.speed_right = 0;
        if (Math.abs(result.speed_left) < 0.3)
            result.speed_left = 0;

        //result = this.scale(result, MAX_JOYSTICK_RANGE);
        if (move.speed_left != result.speed_left || move.speed_right != move.speed_right) {
            $.ajax('/api/commands', {
                data: JSON.stringify(result),
                contentType: 'application/json',
                type: 'POST'
            })
                .done(s => move = result);
            //$.post('/api/commands', result).done(s => move = result);

        }
    });
});