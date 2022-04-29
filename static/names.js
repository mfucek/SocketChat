const adj = [
	"vengeful",
	"heady",
	"dear",
	"logical",
	"glamorous",
	"secretive",
	"mature",
	"wholesale",
	"bored",
	"gabby",
	"raspy",
	"flaky",
	"sulky",
	"energetic",
	"spurious",
	"overrated",
	"illegal",
	"painstaking",
	"civil",
	"chubby",
	"longing",
	"near",
	"highfalutin",
	"faded",
	"familiar",
	"absent",
	"grubby",
	"violet",
	"woebegone",
	"shrill",
	"snotty",
	"perfect",
	"bashful",
	"stupid",
	"disgusted",
	"dark",
	"successful",
	"well-made",
	"grouchy",
	"shaggy",
	"long",
	"ugly",
	"untidy",
	"serious",
	"phobic",
	"eight",
	"therapeutic",
	"husky",
	"political",
	"panoramic"
]

const nou = [
	"thought",
	"recipe",
	"cousin",
	"presence",
	"speaker",
	"platform",
	"cigarette",
	"history",
	"investment",
	"funeral",
	"climate",
	"activity",
	"session",
	"media",
	"college",
	"accident",
	"wedding",
	"description",
	"apple",
	"restaurant",
	"meal",
	"client",
	"administration",
	"pie",
	"painting",
	"percentage",
	"president",
	"effort",
	"pollution",
	"vehicle",
	"childhood",
	"chest",
	"environment",
	"definition",
	"meaning",
	"speech",
	"goal",
	"difficulty",
	"football",
	"system",
	"politics",
	"government",
	"garbage",
	"topic",
	"wealth",
	"attention",
	"ladder",
	"village",
	"distribution",
	"exam"
]

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const getName = () => {
	let out = ""
	out += adj[parseInt(Math.random() * 50)].capitalize();
	out += nou[parseInt(Math.random() * 50)].capitalize();
	return out
}

export {getName}