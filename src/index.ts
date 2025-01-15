import { context } from '@actions/github'
import { getInput, setFailed, setOutput } from '@actions/core'
import * as fs from 'node:fs'

function getInputOrUndefined(name: string): string | undefined {
    const value = getInput('format')
    return value === '' ? undefined : value
}

function getAutoVersion(flavor: string): string | undefined {
    flavor = flavor.toLowerCase()
    if (flavor === 'npm') {
        const pkg = fs.readFileSync('package.json', 'utf8')
        const v = JSON.parse(pkg).version
        return '' + v
    } else {
        throw new Error(`Unknown flavor ${flavor} for auto version detection`)
    }
}

function getDateObject() {
    const date = new Date()
    const pad = (number: any, length: number) => number.toString().padStart(length, '0').slice(-length)
    const int = {
        YYYY: pad(date.getFullYear(), 4), // Year as a 4-digit string
        YY: pad(date.getFullYear(), 2), // Year as a 2-digit string
        MM: pad(date.getMonth() + 1, 2), // Month as a 2-digit string (1-based)
        DD: pad(date.getDate(), 2), // Day of the month as a 2-digit string
        // WEEKDAY: pad(date.getDay(), 1), // Day of the week as a single digit (0–6)
        HH: pad(date.getHours(), 2), // Hours as a 2-digit string
        mm: pad(date.getMinutes(), 2), // Minutes as a 2-digit string
        ss: pad(date.getSeconds(), 2) // Seconds as a 2-digit string
    }
    return {
        ...int,
        DATE: `${int.YYYY}-${int.MM}-${int.DD}`,
        DATETIME: `${int.YYYY}-${int.MM}-${int.DD} ${int.HH}:${int.mm}`
    }
}

function run() {
    // Read external values
    const format = getInputOrUndefined('format')!
    const autoVersion = getInputOrUndefined('auto-version') ?? 'npm'
    const manualVersion = getInputOrUndefined('version')
    const emptyValue = getInputOrUndefined('empty-value') ?? '?'

    if (!format) {
        console.error(`❌ Watermark format has not been provided`)
    } else {
        console.log(`👉 Creating watermark with format ${format}`)
    }

    // Attempt to retrieve a version
    let version: string | undefined = undefined
    if (manualVersion) {
        version = manualVersion
    } else if (autoVersion) {
        try {
            version = getAutoVersion(autoVersion)
        } catch (e) {
            console.error(`❌ Failed to automatically detect the project version`)
            throw e
        }
    }
    const versionSplit = version?.split('.')

    // Produce values
    const values = {
        REF: context.ref,
        BRANCH: context.ref.startsWith('refs/heads/') ? context.ref.replace('refs/heads/', '') : undefined,
        TAGS: context.ref.startsWith('refs/tags/') ? context.ref.replace('refs/tags/', '') : undefined,
        SHA: context.sha,
        SHA7: context.sha.substring(0, 7),
        SHA8: context.sha.substring(0, 8),
        RUN: context.runNumber,
        VERSION: version,
        MAYOR: versionSplit?.[0],
        MINOR: versionSplit?.[1],
        PATCH: versionSplit?.[2],
        ...getDateObject()
    }

    // Execute formatting by replacing all occurrences of known keys with their respective values
    const rx = new RegExp('(' + Object.keys(values).join('|') + ')', 'g')
    const watermark = format.replace(rx, (_, key) => (values as any)[key] ?? emptyValue)

    // Output
    console.log(`🎟️ Watermark is ${watermark}`)
    setOutput('watermark', watermark)
}

try {
    run()
} catch (error: any) {
    setFailed(error.message)
}
