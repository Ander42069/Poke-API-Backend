const express = require('express')
const router = express.Router()
const Pokemon = require('../models/pokemon')

// Getting All
router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.find()
        res.json(pokemons)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Getting One
router.get('/:id', getPokemon, (req, res) => {
    res.json(res.pokemon)
})

// Creating One
router.post('/', async (req, res) => {
    const pokemon = new Pokemon({
        number: req.body.number,
        image: req.body.image,
        name: req.body.name,
        types: req.body.types,
        power: req.body.power
    })
    try {
        const newPokemon = await pokemon.save()
        res.status(201).json(newPokemon)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Creating Many
router.post('/insert-many', async (req, res) => {
    try {
        const pokemons = req.body; // Assumiendo que tu solicitud POST contiene un array de objetos Pokémon

        // Utiliza el método insertMany para insertar los Pokémon en la base de datos
        const result = await Pokemon.insertMany(pokemons);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Updating One
router.patch('/:id', getPokemon, async (req, res) => {
    if(req.body.number != null) {
        res.pokemon.number = req.body.number
    }
    if(req.body.image != null) {
        res.pokemon.image = req.body.image
    }
    if (req.body.name != null) {
        res.pokemon.name = req.body.name
    }
    if (req.body.types != null) {
        res.pokemon.types = req.body.types
    }
    if (req.body.power != null) {
        res.pokemon.power = req.body.power
    }
    try {
        const updatedPokemon = await res.pokemon.save()
        res.json(updatedPokemon)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getPokemon, async (req, res) =>{
    try {
        await res.pokemon.deleteOne()
        res.json({ message: 'Deleted Pokemon' })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Deleting Multiple
router.delete('/', async (req, res) => {
    const pokemonIdsToDelete = req.body.pokemonIds; // Supongamos que los IDs se envían en el cuerpo de la solicitud como un array

    if (!pokemonIdsToDelete || !Array.isArray(pokemonIdsToDelete) || pokemonIdsToDelete.length === 0) {
        return res.status(400).json({ message: 'Invalid or empty array of Pokemon IDs provided' });
    }

    try {
        const result = await Pokemon.deleteMany({ _id: { $in: pokemonIdsToDelete } });

        if (result.deletedCount > 0) {
            res.json({ message: 'Deleted Pokemon', deletedCount: result.deletedCount });
        } else {
            res.status(404).json({ message: 'No matching Pokemon found for deletion' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getPokemon(req, res, next) {
    let pokemon
    try {
        pokemon = await Pokemon.findById(req.params.id)
        if (pokemon == null) {
            return res.status(404).json({ message: 'Cannot find pokemon' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.pokemon = pokemon
    next()
}

module.exports = router