const defaultPdfOptions = { size: 12, letterSpacing: 30 }
const staticData = {
  region: 'X',
  province: 'BUKIDNON',
  city: 'MALAYBALAY',
  barangay: '2',
  date: new Date().toLocaleString(),
}

//TODO
//FILTER WHICH DATA TO RENDER
export const drawPDF4 = (pdf, user, filter) => {
  const pages = pdf.getPages()
  const firstPage = pages[0]
  const height = firstPage.getHeight()
  const letterSpacing = 5
  let lastXPos
  let xPos = 122
  let yPos = height - 65

  firstPage.moveTo(xPos, yPos)
  firstPage.drawText(staticData.region, defaultPdfOptions)

  yPos = height - 85
  firstPage.moveTo(xPos, yPos)
  // Draw each character with adjusted horizontal position
  for (const char of staticData.province) {
    firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
    xPos += defaultPdfOptions.size + letterSpacing
  }
  xPos = 350
  yPos = height - 63
  firstPage.moveTo(xPos, yPos)
  for (const char of staticData.city) {
    firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
    xPos += defaultPdfOptions.size + letterSpacing
  }
  xPos = 335
  yPos = height - 85
  firstPage.moveTo(xPos, yPos)
  for (const char of staticData.barangay) {
    firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
    xPos += defaultPdfOptions.size + letterSpacing
  }
  xPos = 103
  yPos = height - 125
  if (filter.some((field) => field == 'name')) {
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.lastName.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
      lastXPos = xPos
    }
    xPos = lastXPos + 17
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.firstName.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
      lastXPos = xPos
    }
    xPos = lastXPos + 16
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.middleName.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
  }

  if (filter.some((field) => field == 'dateOfBirth')) {
    const date = new Date(user.profile.dateOfBirth)
    let year = date.getFullYear().toString().toUpperCase()
    let month = (date.getMonth() + 1).toString().toUpperCase()
    let day = date.getDate().toString().toUpperCase()
    if (month.length == 1) month = '0' + month
    if (day.length == 1) day = '0' + day

    xPos = 150
    yPos = height - 157
    firstPage.moveTo(xPos, yPos)
    for (const char of month) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }

    xPos = 188
    firstPage.moveTo(xPos, yPos)
    for (const char of day) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
    xPos = 225
    firstPage.moveTo(xPos, yPos)
    for (const char of year) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
  }

  if (filter.some((field) => field == 'placeOfBirth')) {
    xPos = 388
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.placeOfBirth.city.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
  }

  if (filter.some((field) => field == 'sex')) {
    xPos = 153
    if (user.profile.sex === 'male') yPos = height - 197
    else yPos = height - 217

    firstPage.moveTo(xPos, yPos)
    firstPage.drawText('/', { defaultPdfOptions })
  }
  if (filter.some((field) => field == 'civilStatus')) {
    xPos = 353
    if (user.profile.civilStatus === 'single') yPos = height - 197
    else if (user.profile.civilStatus === 'married') yPos = height - 217
    else if (user.profile.civilStatus === 'widower') xPos = 453
    else if (user.profile.civilStatus === 'separated') {
      xPos = 453
      yPos = height - 217
    }
    firstPage.moveTo(xPos, yPos)
    firstPage.drawText('/', { defaultPdfOptions })
  }
  if (filter.some((field) => field == 'citizenship')) {
    xPos = 217
    yPos = height - 237
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.citizenship.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
  }
  if (filter.some((field) => field == 'occupation')) {
    xPos = 250
    yPos = height - 258
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.occupation.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
  }

  if (filter.some((field) => field == 'address')) {
    xPos = 190
    yPos = height - 283
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.address.houseNumber.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
    xPos = 285
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.address.streetName.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
    xPos = 197
    yPos = height - 318
    firstPage.moveTo(xPos, yPos)
    for (const char of user.profile.address.subdivisionPurok.toUpperCase()) {
      firstPage.drawText(char, { x: xPos, ...defaultPdfOptions })
      xPos += defaultPdfOptions.size + letterSpacing
    }
  }
}

export const drawPDF5 = () => {}
