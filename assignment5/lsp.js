class LSP {
    constructor(transCost, dynamicNei, sequence, timeToLive,  origin, transit,tick) {
        this.origin = origin;
        this.dynamicNei = dynamicNei;
        this.sequence = sequence;
        this.timeToLive = timeToLive;
        this.transit = transit;
        this.transCost = transCost;
        this.time = tick;
    }
};

module.exports = LSP;