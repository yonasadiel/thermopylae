import { Group, Quote } from "./types";

export const DEFAULT_BACKGROUND_PARTICLES_ENABLED = true;
export const DEFAULT_IMAGE_PATH = undefined;
export const DEFAULT_QUOTES: Quote[] = [
    { "text": "Non scholae set vitae discimus", "subtext": "- St. Ignatius Loyola" },
    { "text": "If you are the smartest person in a room, you are in the wrong room", "subtext": "" },
    { "text": "Ite Inflamate Omnia", "subtext": "- St. Ignatius Loyola" },
    { "text": "This too, shall pass", "subtext": "" },
    { "text": "Human is the measure of all things", "subtext": "- Protagoras" },
    { "text": "I think, therefore I am", "subtext": "- Rene Descartes" },
    { "text": "What good will it be for someone to gain the whole world, yet forfeit their soul?", "subtext": "- Matthew 16:26" },
    { "text": "Assume everyone you talk to have something for you to learn from", "subtext": "" },
    { "text": "If your mouth open, you\"re not listenting", "subtext": "" },
    { "text": "You either die a hero, or live long enough to see yourself become the villain.", "subtext": "- Harvey Dent" },
    { "text": "Learn to give and not to count the cost.", "subtext": "- St. Ignatius Loyola" },
    { "text": "Be like a duck. Looks calm in the surface, but below, paddle like hell", "subtext": "" },
    { "text": "If you are willing to look at another persons behaviour towards you as a reflection of the state of their relationship with themselves rather than a statement about you as a person, then you will, over time, cease to react at all", "subtext": "- Yogi Bhajan" },
    { "text": "And with privilege comes responsibility", "subtext": "- John F Kennedy" },
    { "text": "It's easier to invent the future than predict it", "subtext": "- Alan Kay" },
    { "text": "A ship in harbor is safe, but that is not what ships are built for.", "subtext": "- John A. Shedd" },
    { "text": "You can be the sweetest peach on the tree, but some people just don't like peaches.", "subtext": "" },
    { "text": "Progress, far from consisting in change, depends on retentiveness. Those who cannot remember the past are condemned to repeat it.", "subtext": "- George Santayana, Life of Reason" },

    { "text": "Inheritance Tax", "subtext": "You wanted a banana but what you got was a gorilla holding the banana and the entire jungle." },
    { "text": "Tell, don't Ask", "subtext": "This principle says that you shouldn't make decisions based on the internal state of an object and then update that object. Doing so totally destroys the benefits of encapsulation and, in doing so, spreads the knowledge of the implementation throughout the code." },
    { "text": "Take small steps-always", "subtext": "In software development, our \"headlights\" are similarly limited [like car's headlights]. We can't see too far ahead into the future, and the further off-axis you look, the darker it gets. So Pragmatic Programmers have a firm rule: Always take small, deliberate steps, checking for feedback and adjusting before proceeding. Consider that the rate of feedback is your speed limit. You never take on a step or a task that's \"too big\".<br/><br/>But, aren't we supposed to design for future maintenance? Yes, but only to a point: only as far ahead as you can see. The more you have to predict what the future will look like, the more risk you incur that you'll be wrong. Instead of wasting effort designing for an uncertain future, you can always fall back on designing your code to be replaceable. Make it easy to throw out your code and replace it with something better suited. Making code replaceable will also help with cohesion, coupling, and DRY, leading to a better design overall." },
    { "text": "Dead programs tell no lies", "subtext": "It's easy to fall into the \"it can't happen\" mentality. And all things being equal, it's likely that we didn't need to—the code in question wouldn't fail under any normal conditions. But we're coding defensively. We're making sure that the data is what we think it is, that the code in production is the code we think it is. We're checking that the correct versions of dependencies were actually loaded." },
    { "text": "Transforming Programming", "subtext": "All programs transform data, converting an input into an output. And yet when we think about design, we rarely think about creating transformations. Instead we worry about classes and modules, data structures and algorithms, languages and frameworks. [...] This focus on code often misses the point: we need to get back to thinking of programs as being something that transforms inputs into outputs. When we do, many of the details we previously worried about just evaporate. The structure becomes clearer, the error handling more consistent, and the coupling drops way down." },
    { "text": "Don't Hoard State; Pass It Around", "subtext": "In the transformational model, we turn that on its head. Instead of little pools of data spread all over the system, think of data as a mighty river, a flow. Data becomes a peer to functionality: a pipeline is a sequence of code → data → code → data.... The data is no longer tied to a particular group of functions, as it is in a class definition. Instead it is free to represent the unfolding progress of our application as it transforms its inputs into its outputs. This means that we can greatly reduce coupling: a function can be used (and reused) anywhere its parameters match the output of some other function." },
    { "text": "Provide options, don't make lame excuses", "subtext": "Before you approach anyone to tell them why something can't be done, is late, or is broken, stop and listen to yourself. Talk to the rubber duck on your monitor, or the cat. Does your excuse sound reasonable, or stupid? How's it going to sound to your boss? <br/> <br/> Run through the conversation in your mind. What is the other person likely to say? Will they ask, \"Have you tried this\" or \"Didn't you consider that?\" How will you respond? Before you go and tell them the bad news, is there anything else you can try? Sometimes, you just know what they are going to say, so save them the trouble." },
    { "text": "Don't live with broken windows", "subtext": "One broken window, left unrepaired for any substantial length of time, instills in the inhabitants of the building a sense of abandonment—a sense that the powers that be don't care about the building. So another window gets broken. People start littering. Graffiti appears. Serious structural damage begins. In a relatively short space of time, the building becomes damaged beyond the owner's desire to fix it, and the sense of abandonment becomes reality. <br/> <br/> Don't leave \"broken windows\" (bad designs, wrong decisions, or poor code) unrepaired. Fix each one as soon as it is discovered. If there is insufficient time to fix it properly, then board it up. Perhaps you can comment out the offending code, or display a \"Not Implemented\" message, or substitute dummy data instead. Take some action to prevent further damage and to show that you're on top of the situation." },
    { "text": "Be a catalyst for change", "subtext": "You may be in a situation where you know exactly what needs doing and how to do it. The entire system just appears before your eyes—you know it's right. But ask permission to tackle the whole thing and you'll be met with delays and blank stares. People will form committees, budgets will need approval, and things will get complicated. Everyone will guard their own resources. Sometimes this is called \"start-up fatigue.\" <br/> <br/> It's time to bring out the stones. Work out what you can reasonably ask for. Develop it well. Once you've got it, show people, and let them marvel. Then say \"of course, it would be better if we added ..\" Pretend it's not important. Sit back and wait for them to start asking you to add the functionality you originally wanted. People find it easier to join an ongoing success. Show them a glimpse of the future and you'll get them to rally around." },
    { "text": "Invest regularly in your knowledge portfolio", "subtext": "<string>Invest regularly.</strong> Even if it's just a small amount, the habit itself is as important as the sums. <br/> <br/> <strong>Diversify.</strong> The more different things you know, the more valuable you are.<br/> <br/> <strong>Manage risk.</strong> Technology exists along a spectrum from risky, potentially high-reward to low-risk, low-reward standards.<br/> <br/> <strong>Buy low</strong>, sell high. Learning an emerging technology before it becomes popular can be just as hard as finding an undervalued stock, but the payoff can be just as rewarding.<br/> <br/> <strong>Review and rebalance.</strong> This is a very dynamic industry. That hot technology you started investigating last month might be stone cold by now." },
    { "text": "Good design is easier to change than bad design", "subtext": "First, given that you're not sure what form change will take, you can always fall back on the ultimate \"Easy To Change\" (ETC) path: try to make what you write replaceable. That way, whatever happens in the future, this chunk of code won't be a roadblock. It seems extreme, but actually it's what you should be doing all the time, anyway. It's really just thinking about keeping code decoupled and cohesive. <br/><br/> Second, treat this as a way to develop instincts. Note the situation in your engineering day book: the choices you have, and some guesses about change. Leave a tag in the source. Then, later, when this code has to change, you'll be able to look back and give yourself feedback. It might help the next time you reach a similar fork in the road." },
    { "text": "DRY—Don't Repeat Yourself", "subtext": "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.<br/><br/> DRY is about the duplication of knowledge, of intent. It's about expressing the same thing in two different places, possibly in two totally different ways." },
    { "text": "Make it easy to reuse", "subtext": "What you're trying to do is foster an environment where it's easier to find and reuse existing stuff than to write it yourself. If it isn't easy, people won't do it. And if you fail to reuse, you risk duplicating knowledge." },
    { "text": "There are no final decisions", "subtext": "By sticking to DRY principle, decoupling, and use of external configuration—we don't have to make as many critical, irreversible decisions. This is a good thing, because we don't always make the best decisions the first time around. Requirements, users, and hardware change faster than we can get the software developed. <br/> <br/> The mistake lies in assuming that any decision is cast in stone—and in not preparing for the contingencies that might arise." },
    { "text": "Keep knowledge in plain text", "subtext": "The problem with most binary formats is that the context necessary to understand the data is separate from the data itself. You are artificially divorcing the data from its meaning.<br/><br/> Plain text doesn't mean that the text is unstructured; HTML, JSON, YAML, and so on are all plain text. So are the majority of the fundamental protocols on the net, such as HTTP, SMTP, IMAP, and so on. And that's for some good reasons: <br/><br/><b>Insurance against obsolescence.</b> Human-readable forms of data, and self-describing data, will outlive all other forms of data and the applications that created them. <br/><b>Leverage existing tools.</b> Virtually every tool in the computing universe, from version control systems to editors to command-line tools, can operate on plain text. <br/><b>Easier testing.</b> If you use plain text to create synthetic data to drive system tests, then it is a simple matter to add, update, or modify the test data without having to create any special tools to do so." },
    { "text": "Achieve fluency", "subtext": "First, look at yourself while you're working. Every time you find yourself doing something repetitive, get into the habit of thinking \"there must be a better way.\" Then find it." },
    { "text": "Fix the problem, not the blame", "subtext": "If your first reaction on witnessing a bug or seeing a bug report is \"that's impossible,\" you are plainly wrong. Don't waste a single neuron on the train of thought that begins \"but that can't happen\" because quite clearly it can, and has.<br/><br/>Beware of myopia when debugging. Resist the urge to fix just the symptoms you see: it is more likely that the actual fault may be several steps removed from what you are observing, and may involve a number of other related things. Always try to discover the root cause of a problem, not just this particular appearance of it." },
    { "text": "You can't write perfect software", "subtext": "We are constantly interfacing with other people's code—code that might not live up to our high standards—and dealing with inputs that may or may not be valid. So we are taught to code defensively. If there's any doubt, we validate all information we're given. We use assertions to detect bad data, and distrust data from potential attackers or trolls. We check for consistency, put constraints on database columns, and generally feel pretty good about ourselves.<br/><br/>But Pragmatic Programmers take this a step further. They don't trust themselves, either. Knowing that no one writes perfect code, including themselves, Pragmatic Programmers build in defenses against their own mistakes." },

    { "text": "Code Wins Arguments", "subtext": "" },
    { "text": "Defensive Programming", "subtext": "Defensive programming is a form of defensive design intended to develop programs that are capable of detecting potential security abnormalities and make predetermined responses. It ensures the continuing function of a piece of software under unforeseen circumstances. Defensive programming practices are often used where high availability, safety, or security is needed." },
    { "text": "Do it asynchronously", "subtext": "Delegate. always. once you delegated, a new thread started. you are ready to listen to new “requests”, even if you are single-threaded (but you do have a multi-threading choice, shown below), but you still can be fast, like Redis! as long as your I/O is not blocked.<br/><br/>So when you get a task from the project manager. you should try to avoid doing it yourself, and try to assign it to a junior dev, as fresh as possible. use greedy thinking.<br/><br/>But what if you don't have anyone to delegate? mentor, keep doing it. It's your job.<br/><br/>- <a href=\"https://iorilan.medium.com/how-to-delegate-tasks-as-a-senior-lead-engineer-ad5136eb68a0\">Lory</a>" }


];
export const DEFAULT_GROUPS: Group[] = [
    {
        title: "Developer",
        bangs: [
            {
                "commands": ["epoch"],
                "description": "Epoch converter",
                "target": "https://www.epochconverter.com/?source=searchbar&q=${epoch}",
                "params": [
                    {
                        "key": "epoch",
                        "default": "17000000"
                    }
                ]
            }
        ]
    }
];

export const DEFAULT_PARTICLE_SETTINGS = {
    "particles": {
        "number": {
            "value": 120,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.2,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 12.181158184520175,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 160.3412060865523,
            "color": "#ffffff",
            "opacity": 0.2725800503471389,
            "width": 0.8017060304327615
        },
        "move": {
            "enable": true,
            "speed": 0.4,
            "direction": "top",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 100,
                "size": 2,
                "duration": 2,
                "opacity": 1,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": false
}