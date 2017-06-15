//not using atm
var Crosshair : Texture2D;

function OnGUI()
{
	//display crosshair in middle of screen: halfway between screen height and screen width
	var w = Crosshair.width/2;
	var h = Crosshair.height/2;
	
	position = Rect((Screen.width - w)/2, (Screen.height - h)/2,w,h);
	
	//for aiming down the scope with right click
	/*if (!Input.GetButton("fire2"))
	{
		GUI.DrawTexture(position,Crosshair);
	}*/
}