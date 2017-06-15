#pragma strict

var playerLook : UnityStandardAssets.Characters.FirstPerson.FirstPersonController;

var charController : CharacterController;

var shootScript : RaycastShooting;

var respawnTransform : Transform;

static var playerIsDead = false;

function Start()
{
	playerLook = gameObject.GetComponent(UnityStandardAssets.Characters.FirstPerson.FirstPersonController);
	charController = gameObject.GetComponent(CharacterController);
	shootScript = gameObject.GetComponent(RaycastShooting);
}

function Update()
{
	if (playerIsDead == true)
	{
		playerLook.enabled = false;
		charController.enabled = false;
		shootScript.enabled = false;
	}
	
}

function OnGUI()
{
	if (playerIsDead == true)
	{
		GUI.Box(Rect(Screen.width*0.5-50,200-20,100,40), "Wasted!");
		if (GUI.Button(Rect(Screen.width*0.5-50,240,100,40),"RESPAWN"))
		{
			RespawnPlayer();
		}
	}
}

function RespawnPlayer()
{
	transform.position = respawnTransform.position;
	transform.rotation = respawnTransform.rotation;
	gameObject.SendMessage("RespawnHealth");
	playerLook.enabled = true;
	charController.enabled = true;
	playerIsDead = false;
	shootScript.enabled = true;
}