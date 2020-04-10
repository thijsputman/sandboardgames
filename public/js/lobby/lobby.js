var webcamBoxWidth = 320;
var webcamBoxHeight = 240;

var wsLocation = "lobby";

var maxPlayers = 20;

$(document).on("gameObj", function(e, gameObj, myPlayerId, scale){
	myX = 0;
	myY = 0;
	
	myX = $("#webcambox" + myPlayerId).position().left * (1 / scale) + (160 * (1 / scale));
	myY = $("#webcambox" + myPlayerId).position().top * (1 / scale) + (120 * (1 / scale));

	for (player of gameObj.players)
	{
		if (player.id != myPlayerId)
		{
			theirX = $("#webcambox" + player.id).position().left * (1 / scale) + (160 * (1 / scale));
			theirY = $("#webcambox" + player.id).position().top * (1 / scale) + (120 * (1 / scale));
			var distance = calcDistance(myX, theirX, myY, theirY);
			//console.log(distance);
			var volume = 1;
			if (distance > 350)
			{
				if (distance > 2500)
				{
					volume = 0.08;
				}
				else
				{
					volume = 0.08 + (2500 - distance) / (2500)

				}
			}
			if ( $('#webcam' + player.id + ' video').length ) {
				$('#webcam' + player.id + ' video')[0].volume = volume;
			}
		}
	}
})

function calcDistance(x1, x2, y1, y2)
{
	var a = x1 - x2;
	var b = y1 - y2;

	var c = Math.sqrt( a*a + b*b );

	return c;
}