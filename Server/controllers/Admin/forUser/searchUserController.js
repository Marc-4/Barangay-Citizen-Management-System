import { User, Profile } from '../../../models/index.js'

const searchUser = async (req, res) => {
  try {
    const { query, page, entries } = req.query
    const users = await User.find({
      $or: [{ username: { $regex: query, $options: 'i' } }],
    })
      .skip((page - 1) * entries)
      .limit(Number(entries))

    const profiles = await Profile.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { middleName: { $regex: query, $options: 'i' } },
        { sex: { $regex: query, $options: 'i' } },
        { civilStatus: { $regex: query, $options: 'i' } },
      ],
    })
      .skip((page - 1) * entries)
      .limit(Number(entries))

    const payload = { users: users, profiles: profiles }

    return sendSuccess(payload, 200, res)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default searchUser
