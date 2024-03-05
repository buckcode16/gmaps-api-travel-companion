import { User } from '../mongoose/schemas/user.mjs'

export const addPlaceHandler = async (request, response) => {
  const userId = request.user._id
  const card = request.body // Assuming 'card' is the object to store

  try {
    const serializedCard = JSON.stringify(card)
    await User.findByIdAndUpdate(userId, {
      $push: { place_ids: serializedCard },
    })
    response.status(200).send({ message: 'Place added successfully.' })
  } catch (error) {
    response.status(400).send({ message: 'Error adding place.', error })
  }
}
export const getPlaceIdsHandler = async (request, response) => {
  const userId = request.user._id

  try {
    const user = await User.findById(userId)
    if (!user) return response.status(404).send({ message: 'User not found.' })

    const placeIds = user.place_ids.map((placeString) =>
      JSON.parse(placeString),
    )

    response.cookie('place_ids', JSON.stringify(placeIds), {
      httpOnly: true,
    })

    response.status(200).send(placeIds)
  } catch (error) {
    response.status(400).send({ message: 'Error retrieving place IDs.', error })
  }
}

export const removePlaceHandler = async (request, response) => {
  const userId = request.user._id
  const { placeId } = request.body

  try {
    const user = await User.findById(userId)
    if (!user) return response.status(404).send({ message: 'User not found.' })

    // Deserialize and filter out the card to remove
    const updatedPlaceIds = user.place_ids
      .map((placeString) => JSON.parse(placeString))
      .filter((card) => card.place_id !== placeId)
      .map((card) => JSON.stringify(card)) // Serialize them back

    // Update the user's place_ids with the filtered array
    user.place_ids = updatedPlaceIds
    await user.save()

    response.status(200).send({ message: 'Place removed successfully.' })
  } catch (error) {
    response.status(400).send({ message: 'Error removing place.', error })
  }
}
