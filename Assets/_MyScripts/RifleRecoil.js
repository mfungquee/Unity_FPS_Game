#pragma strict

function Start () {
	
}
//script to play and stop recoil animation on mouse button clicks
function Update () {
	
	if (Input.GetMouseButtonDown(0))
	{
		GetComponent.<Animation>().CrossFade("RifleRecoil"); //play animation
		GetComponent.<AudioSource>().Play(); //play sound
	}
	
	else if (Input.GetMouseButtonUp(0))
	{
		GetComponent.<Animation>().Stop("RifleRecoil"); //stop animation
		GetComponent.<AudioSource>().Stop(); //stop sound
	}
}
