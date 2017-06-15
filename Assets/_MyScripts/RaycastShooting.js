#pragma strict

var theDamage = 10;

var hit : RaycastHit;

var bulletHoles : GameObject;

var bloodEffect : GameObject;


function Update () {
	
	var ray : Ray = Camera.main.ScreenPointToRay(Vector3(Screen.width*0.5, Screen.height*0.5,0));
	
	if (Input.GetMouseButton(0))
	{
		if (Physics.Raycast (ray, hit, 100))
		{
			hit.transform.SendMessage("ApplyDamage", theDamage, SendMessageOptions.DontRequireReceiver);
			
			BulletEffects();
		}
	}
}

function BulletEffects()
{
	if(hit.transform.tag == "Environement")
	{
		Instantiate(bulletHoles,hit.point,Quaternion.FromToRotation(Vector3.right,hit.normal));
	}
	
	else if(hit.transform.tag == "Enemy")
	{
		Instantiate(bloodEffect,hit.point,Quaternion.FromToRotation(Vector3.up,hit.normal));
	}
}
