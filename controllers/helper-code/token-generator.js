//Functions =============================================================
function GetLetter()
{
	var alpha = "abcdefghijklmnopqrstuvwxyz".split('');
	var randomIndex = Math.floor(Math.random() * 26);

	return alpha[randomIndex];
}

function GetNumber()
{
	var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	var randomIndex = Math.floor(Math.random() * 10);

	return numbers[randomIndex];
}

function RandomCaps(tokenArray)
{
	var cappedTokenArray = [];
	for (var index = 0; index < tokenArray.length; index++)
	{
		if (typeof tokenArray[index] === "string")
		{
			if (Math.round(Math.random()))
				cappedTokenArray.push(tokenArray[index].toUpperCase());
			else
				cappedTokenArray.push(tokenArray[index]);
		}
		else
			cappedTokenArray.push(tokenArray[index]);
	}
	return cappedTokenArray;
}

function RandomIndexInRange(minInput, maxInput)
{	
	if (minInput === maxInput)
		return -1;

	var min = minInput;
	var max = maxInput;

	//incase of user error
	if (maxInput < minInput)
	{
		min = maxInput;
		max = minInput;
	}

	return (Math.floor(Math.random() * (max - min + 1))) + min;
}

function ReplaceWithUnderscore(tokenArray, range = 4)
{
	var newTokenArray = tokenArray;
	var randomIndex = RandomIndexInRange(range, tokenArray.length - range);

	newTokenArray[randomIndex] = '_';

	return newTokenArray;
}

function GenerateToken(length = 25)
{
	var token = [];

	for (var index = 0; index < length; index++)
	{
		//decide if getting letter or number
		if (Math.round(Math.random()))
			token.push(GetLetter());
		else
			token.push(GetNumber());
	}
	token = RandomCaps(token);
	token = ReplaceWithUnderscore(token);
	return token.join('');
}

//Export ================================================================
module.exports = GenerateToken;










