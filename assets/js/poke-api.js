const poke_api = {};
var t = 0

async function convert_pokeApi_to_pokemon(poke_detail) {
    const pokemon = new Pokemon();
    pokemon.id = poke_detail.id;
    pokemon.name = poke_detail.name;

    const types = poke_detail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = poke_detail.sprites.other.dream_world.front_default;

    pokemon.photo = poke_detail.sprites.other.dream_world.front_default
    pokemon.weight = poke_detail.weight
    pokemon.height = poke_detail.height
    pokemon.mainmove = poke_detail.moves[0].move.name
    pokemon.abi = poke_detail.abilities[0].ability.name
    pokemon.hp = poke_detail.stats[0].base_stat
    pokemon.atk = poke_detail.stats[1].base_stat
    pokemon.def = poke_detail.stats[2].base_stat
    pokemon.spcatk = poke_detail.stats[3].base_stat
    pokemon.spcdef = poke_detail.stats[4].base_stat
    pokemon.speed = poke_detail.stats[5].base_stat

    await fetch(poke_detail.species.url)
        .then((response) => response.json())
        .then((story) => {
            story.flavor_text_entries.map((text) => {
                if (text.language.name === 'en') {
                    pokemon.storyEn = text.flavor_text;
                }
            });
        })

    await fetch(poke_detail.species.url)
        .then((response) => response.json())
        .then((story) => {
            story.flavor_text_entries.map((text) => {
                if (text.language.name === 'es') {
                    pokemon.storyEs = text.flavor_text;
                }
            });
        })
    await fetch(poke_detail.species.url)
        .then((response) => response.json())
        .then((story) => {
            story.flavor_text_entries.map((text) => {
                if (text.language.name === 'ja') {
                    pokemon.storyJp = text.flavor_text;
                }
            });
        })

    return pokemon;
}

poke_api.get_pokemon_detail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convert_pokeApi_to_pokemon)
}

poke_api.get_pokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((json_body) => json_body.results)
        .then((pokemons) => pokemons.map(poke_api.get_pokemon_detail))
        .then((detail_request) => Promise.all(detail_request))
        .then((pokemon_details) => pokemon_details)
}

poke_api.get_pokemonByName = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeAPIDetailToPokemon)
        .catch((e) => alert('Pokemon não encontrado!'));
}

