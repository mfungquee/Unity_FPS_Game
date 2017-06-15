var Distance;
var Target : Transform;
var lookAtDistance = 50.0;
var chaseRange = 25.0;
var followRange = 40.0;
var attackRange = 2.0;
private var moveSpeedWalk = 2.0;
private var moveSpeedRun = 4.0;
//var moveSpeed = 4.0;
var Damping = 6.0;
var attackRepeatTime = 1;
var theDamage = 20;
private var attackTime : float;
var controller : CharacterController;
var gravity : float = 20.0;
private var moveDirection : Vector3 = Vector3.zero;
private var anim : Animator;
var Health = 200;
var maxDistance = 3.0;
var Death;

function Start () {
	
	attackTime = Time.time;
	anim = GetComponent.<Animator>();
}

function Update () {
	
	Distance = Vector3.Distance(Target.position,transform.position);
	
	Death = Health <= 0;
	
	if (Death)
	{
		anim.SetBool("Death",true);
		Destroy(gameObject,10);
	}
	else
	{
		anim.SetBool("Death",false);
	}
	
	if(Distance <= lookAtDistance && !Death)
	{
		LookAtPlayer();
		MaxDistanceToPlayer();
	}
	
	if(Distance <= followRange && !Death)
	{
		anim.SetBool("Walk",true);
		FollowPlayer();
		MaxDistanceToPlayer();
	}
	else
	{
		anim.SetBool("Walk",false);
	}
	
	if(Distance <= attackRange && !Death)
	{
		anim.SetBool("Attack",true);
		AttackPlayer();
		MaxDistanceToPlayer();
		
	}
	else
	{
		anim.SetBool("Attack",false);
	}
		
	
	if(Distance <= chaseRange && !Death)
	{
		anim.SetBool("Run",true);
		ChasePlayer();
		MaxDistanceToPlayer();
	}
	else
	{
		anim.SetBool("Run",false);
	}
}

function LookAtPlayer()
{
	var rotation = Quaternion.LookRotation(Target.position - transform.position);
	
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
}
function ChasePlayer()
{
	moveDirection = transform.forward;
	moveDirection *= moveSpeedRun;
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
}


function AttackPlayer()
{
	if (Time.time > attackTime)
	{
		Target.SendMessage("ApplyDamage", theDamage);
		attackTime = Time.time * attackRepeatTime;
	}
}


function FollowPlayer()
{
	moveDirection = transform.forward;
	moveDirection *= moveSpeedWalk;
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
}

function ApplyDamage(TheDamage : int)
{
	Health -= TheDamage;

}

function MaxDistanceToPlayer()
{
	if(Distance <= maxDistance)
	{
		moveSpeedRun = 0;
		moveSpeedWalk = 0;
	}
	else
	{
		moveSpeedRun = 4.0;
		moveSpeedWalk = 2.0;
	}
	
}

