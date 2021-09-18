"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

for (let line of poem) {
	createBlock(line);
}
// TODO: insert each line into blockchain

function createBlock(_data) {
	let block = {
	 index: Blockchain.blocks.length,
	 prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
	 timestamp: Date.now(),
	 data: _data,
	};
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
	console.log(block);
};

function verifyChain(Blockchain){
	for (let i = 0; i < Blockchain.blocks.length; i++){
		let b = Blockchain.blocks[i];
		let pervB = Blockchain.blocks[i - 1];
		if(i === 0 && b.index === 0 && b.hash == "000000"){
			return true;
		}else if (b.data && b.prevHash && b.prevHash === pervB.hash && b.index === pervB.index + 1 && b.hash === blockHash(b)){
			return true;
		}else{
			return false;
		}
	}
}



 console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	//could be done by using JSON.stringify on the "bl", save it in a variable, then add the varial inside the return statement
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp};`
			).digest("hex");
}
