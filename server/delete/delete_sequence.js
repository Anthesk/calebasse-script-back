export default async function (req, res, next) {
  try {
    res.send('Unauthorized')
  } catch (error) {
    next(error)
  }
}
