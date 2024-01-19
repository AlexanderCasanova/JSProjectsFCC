
const requestPokemonAPi= async (nick)=>{
    try{
        const res= await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nick.toLowerCase()}`)
        const data= await res.json()
        console.log(data)
        return data

    }catch(err){
        alert("Pokémon not found")
    }
}



const searchInput=document.getElementById("search-input")
const searchButton=document.getElementById("search-button")
const pokemon_name=document.getElementById("pokemon-name")
const pokemon_id=document.getElementById("pokemon-id")
const weight=document.getElementById("weight")
const height=document.getElementById("height")
const sprite=document.getElementById("sprite-container")
const type=document.getElementById("types")
const hp=document.getElementById("hp")
const attack=document.getElementById("attack")
const defense=document.getElementById("defense")
const sp_attack=document.getElementById("special-attack")
const sp_defense=document.getElementById("special-defense")
const speed=document.getElementById("speed")

searchButton.onclick=async()=>{
    const data = await requestPokemonAPi(searchInput.value)
    pokemon_name.innerHTML=data.name.toUpperCase()
    pokemon_id.innerHTML=`#${data.id}` 
    weight.innerHTML=`Weight: ${data.weight}` 
    height.innerHTML=`Height: ${data.height}` 
    hp.innerHTML=data.stats[0].base_stat
    attack.innerHTML=data.stats[1].base_stat
    defense.innerHTML=data.stats[2].base_stat
    sp_attack.innerHTML=data.stats[3].base_stat
    sp_defense.innerHTML=data.stats[4].base_stat
    speed.innerHTML=data.stats[5].base_stat
    type.innerHTML=""
    sprite.innerHTML=`<img id="sprite" src="${data.sprites.front_default}">`
    data.types.forEach(element => {
        type.innerHTML+=`<span>${element.type.name}</span>`
    });
}