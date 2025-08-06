// --- INICIO DEL CÓDIGO FINAL PARA: functions/index.js ---

/**
 * Responde a cualquier petición HTTP.
 * Esta es una Cloud Function de "Hola Mundo" para verificar la conexión.
 *
 * @param {Object} req Objeto de la petición de la Cloud Function.
 * @param {Object} res Objeto de la respuesta de la Cloud Function.
 */
exports.generatePodcast = (req, res) => {
  // 1. Verificamos nuestro token secreto para proteger la función
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split('Bearer ')[1];

  if (token !== process.env.GCF_AUTH_TOKEN) {
    console.error("Llamada no autorizada recibida.");
    // Devolvemos un error 401 si el token no es correcto
    return res.status(401).send('Unauthorized');
  }

  // 2. Extraemos el ID del podcast del cuerpo de la petición
  const podcastId = req.body.podcastId || 'ID_NO_RECIBIDO';
  
  // 3. Imprimimos un log para verificar que funcionó. Esto lo veremos en Google Cloud.
  console.log(`[LOG] Solicitud recibida exitosamente para procesar el podcast: ${podcastId}`);

  // 4. Respondemos con un estado "202 Accepted" para indicar que el trabajo ha comenzado.
  res.status(202).send({ message: "Solicitud aceptada. Procesando en segundo plano." });
};
// --- FIN DEL CÓDIGO FINAL PARA: functions/index.js ---