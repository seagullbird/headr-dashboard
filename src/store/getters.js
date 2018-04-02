const getters = {
  sidebar: state => state.app.sidebar,
  access_token: state => state.user.access_token,
  id_token: state => state.user.id_token,
  avatar: state => state.user.avatar,
  email: state => state.user.email,
  name: state => state.user.name,
  site_id: state => state.user.site_id
}
export default getters
