"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHeader = void 0;
var common_1 = __importDefault(require("@sbr/common"));
var sbr_util_1 = require("sbr-util");
var clique_1 = require("./clique");
var DEFAULT_GAS_LIMIT = new sbr_util_1.BN(Buffer.from('ffffffffffffff', 'hex'));
/**
 * An object that represents the block header.
 */
var BlockHeader = /** @class */ (function () {
    /**
     * This constructor takes the values, validates them, assigns them and freezes the object.
     * Use the public static factory methods to assist in creating a Header object from
     * varying data types.
     * For a default empty header, use `BlockHeader.fromHeaderData()`.
     */
    function BlockHeader(parentHash, uncleHash, coinbase, stateRoot, transactionsTrie, receiptTrie, bloom, difficulty, number, gasLimit, gasUsed, timestamp, extraData, mixHash, nonce, options) {
        if (options === void 0) { options = {}; }
        var _a;
        this._errorPostfix = '';
        if (options.common) {
            this._common = Object.assign(Object.create(Object.getPrototypeOf(options.common)), options.common);
        }
        else {
            var chain = 'mainnet'; // default
            if (options.initWithGenesisHeader) {
                this._common = new common_1.default({ chain: chain, hardfork: 'chainstart' });
            }
            else {
                // This initializes on the Common default hardfork
                this._common = new common_1.default({ chain: chain });
            }
        }
        if (options.hardforkByBlockNumber) {
            this._common.setHardforkByBlockNumber(number.toNumber());
        }
        if (options.initWithGenesisHeader) {
            number = new sbr_util_1.BN(0);
            if (gasLimit.eq(DEFAULT_GAS_LIMIT)) {
                gasLimit = new sbr_util_1.BN(sbr_util_1.toBuffer(this._common.genesis().gasLimit));
            }
            if (timestamp.isZero()) {
                timestamp = new sbr_util_1.BN(sbr_util_1.toBuffer(this._common.genesis().timestamp));
            }
            if (difficulty.isZero()) {
                difficulty = new sbr_util_1.BN(sbr_util_1.toBuffer(this._common.genesis().difficulty));
            }
            if (extraData.length === 0) {
                extraData = sbr_util_1.toBuffer(this._common.genesis().extraData);
            }
            if (nonce.equals(sbr_util_1.zeros(8))) {
                nonce = sbr_util_1.toBuffer(this._common.genesis().nonce);
            }
            if (stateRoot.equals(sbr_util_1.zeros(32))) {
                stateRoot = sbr_util_1.toBuffer(this._common.genesis().stateRoot);
            }
        }
        this.parentHash = parentHash;
        this.uncleHash = uncleHash;
        this.coinbase = coinbase;
        this.stateRoot = stateRoot;
        this.transactionsTrie = transactionsTrie;
        this.receiptTrie = receiptTrie;
        this.bloom = bloom;
        this.difficulty = difficulty;
        this.number = number;
        this.gasLimit = gasLimit;
        this.gasUsed = gasUsed;
        this.timestamp = timestamp;
        this.extraData = extraData;
        this.mixHash = mixHash;
        this.nonce = nonce;
        this._validateHeaderFields();
        this._checkDAOExtraData();
        // Now we have set all the values of this Header, we possibly have set a dummy
        // `difficulty` value (defaults to 0). If we have a `calcDifficultyFromHeader`
        // block option parameter, we instead set difficulty to this value.
        if (options.calcDifficultyFromHeader) {
            this.difficulty = this.canonicalDifficulty(options.calcDifficultyFromHeader);
        }
        // If cliqueSigner is provided, seal block with provided privateKey.
        if (options.cliqueSigner) {
            // Ensure extraData is at least length CLIQUE_EXTRA_VANITY + CLIQUE_EXTRA_SEAL
            var minExtraDataLength = clique_1.CLIQUE_EXTRA_VANITY + clique_1.CLIQUE_EXTRA_SEAL;
            if (this.extraData.length < minExtraDataLength) {
                var remainingLength = minExtraDataLength - this.extraData.length;
                this.extraData = Buffer.concat([this.extraData, Buffer.alloc(remainingLength)]);
            }
            this.extraData = this.cliqueSealBlock(options.cliqueSigner);
        }
        this._errorPostfix = "block number=" + this.number.toNumber() + " hash=" + this.hash().toString('hex');
        var freeze = (_a = options === null || options === void 0 ? void 0 : options.freeze) !== null && _a !== void 0 ? _a : true;
        if (freeze) {
            Object.freeze(this);
        }
    }
    /**
     * Static constructor to create a block header from a header data dictionary
     *
     * @param headerData
     * @param opts
     */
    BlockHeader.fromHeaderData = function (headerData, opts) {
        if (headerData === void 0) { headerData = {}; }
        var parentHash = headerData.parentHash, uncleHash = headerData.uncleHash, coinbase = headerData.coinbase, stateRoot = headerData.stateRoot, transactionsTrie = headerData.transactionsTrie, receiptTrie = headerData.receiptTrie, bloom = headerData.bloom, difficulty = headerData.difficulty, number = headerData.number, gasLimit = headerData.gasLimit, gasUsed = headerData.gasUsed, timestamp = headerData.timestamp, extraData = headerData.extraData, mixHash = headerData.mixHash, nonce = headerData.nonce;
        return new BlockHeader(parentHash ? sbr_util_1.toBuffer(parentHash) : sbr_util_1.zeros(32), uncleHash ? sbr_util_1.toBuffer(uncleHash) : sbr_util_1.KECCAK256_RLP_ARRAY, coinbase ? new sbr_util_1.Address(sbr_util_1.toBuffer(coinbase)) : sbr_util_1.Address.zero(), stateRoot ? sbr_util_1.toBuffer(stateRoot) : sbr_util_1.zeros(32), transactionsTrie ? sbr_util_1.toBuffer(transactionsTrie) : sbr_util_1.KECCAK256_RLP, receiptTrie ? sbr_util_1.toBuffer(receiptTrie) : sbr_util_1.KECCAK256_RLP, bloom ? sbr_util_1.toBuffer(bloom) : sbr_util_1.zeros(256), difficulty ? new sbr_util_1.BN(sbr_util_1.toBuffer(difficulty)) : new sbr_util_1.BN(0), number ? new sbr_util_1.BN(sbr_util_1.toBuffer(number)) : new sbr_util_1.BN(0), gasLimit ? new sbr_util_1.BN(sbr_util_1.toBuffer(gasLimit)) : DEFAULT_GAS_LIMIT, gasUsed ? new sbr_util_1.BN(sbr_util_1.toBuffer(gasUsed)) : new sbr_util_1.BN(0), timestamp ? new sbr_util_1.BN(sbr_util_1.toBuffer(timestamp)) : new sbr_util_1.BN(0), extraData ? sbr_util_1.toBuffer(extraData) : Buffer.from([]), mixHash ? sbr_util_1.toBuffer(mixHash) : sbr_util_1.zeros(32), nonce ? sbr_util_1.toBuffer(nonce) : sbr_util_1.zeros(8), opts);
    };
    /**
     * Static constructor to create a block header from a RLP-serialized header
     *
     * @param headerData
     * @param opts
     */
    BlockHeader.fromRLPSerializedHeader = function (serialized, opts) {
        var values = sbr_util_1.rlp.decode(serialized);
        if (!Array.isArray(values)) {
            throw new Error('Invalid serialized header input. Must be array');
        }
        return BlockHeader.fromValuesArray(values, opts);
    };
    /**
     * Static constructor to create a block header from an array of Buffer values
     *
     * @param headerData
     * @param opts
     */
    BlockHeader.fromValuesArray = function (values, opts) {
        if (values.length > 15) {
            throw new Error('invalid header. More values than expected were received');
        }
        var _a = __read(values, 15), parentHash = _a[0], uncleHash = _a[1], coinbase = _a[2], stateRoot = _a[3], transactionsTrie = _a[4], receiptTrie = _a[5], bloom = _a[6], difficulty = _a[7], number = _a[8], gasLimit = _a[9], gasUsed = _a[10], timestamp = _a[11], extraData = _a[12], mixHash = _a[13], nonce = _a[14];
        return new BlockHeader(sbr_util_1.toBuffer(parentHash), sbr_util_1.toBuffer(uncleHash), new sbr_util_1.Address(sbr_util_1.toBuffer(coinbase)), sbr_util_1.toBuffer(stateRoot), sbr_util_1.toBuffer(transactionsTrie), sbr_util_1.toBuffer(receiptTrie), sbr_util_1.toBuffer(bloom), new sbr_util_1.BN(sbr_util_1.toBuffer(difficulty)), new sbr_util_1.BN(sbr_util_1.toBuffer(number)), new sbr_util_1.BN(sbr_util_1.toBuffer(gasLimit)), new sbr_util_1.BN(sbr_util_1.toBuffer(gasUsed)), new sbr_util_1.BN(sbr_util_1.toBuffer(timestamp)), sbr_util_1.toBuffer(extraData), sbr_util_1.toBuffer(mixHash), sbr_util_1.toBuffer(nonce), opts);
    };
    /**
     * Alias for Header.fromHeaderData() with initWithGenesisHeader set to true.
     */
    BlockHeader.genesis = function (headerData, opts) {
        if (headerData === void 0) { headerData = {}; }
        opts = __assign(__assign({}, opts), { initWithGenesisHeader: true });
        return BlockHeader.fromHeaderData(headerData, opts);
    };
    /**
     * Validates correct buffer lengths, throws if invalid.
     */
    BlockHeader.prototype._validateHeaderFields = function () {
        var _a = this, parentHash = _a.parentHash, stateRoot = _a.stateRoot, transactionsTrie = _a.transactionsTrie, receiptTrie = _a.receiptTrie, mixHash = _a.mixHash, nonce = _a.nonce;
        if (parentHash.length !== 32) {
            throw new Error("parentHash must be 32 bytes, received " + parentHash.length + " bytes");
        }
        if (stateRoot.length !== 32) {
            throw new Error("stateRoot must be 32 bytes, received " + stateRoot.length + " bytes");
        }
        if (transactionsTrie.length !== 32) {
            throw new Error("transactionsTrie must be 32 bytes, received " + transactionsTrie.length + " bytes");
        }
        if (receiptTrie.length !== 32) {
            throw new Error("receiptTrie must be 32 bytes, received " + receiptTrie.length + " bytes");
        }
        if (mixHash.length !== 32) {
            throw new Error("mixHash must be 32 bytes, received " + mixHash.length + " bytes");
        }
        if (nonce.length !== 8) {
            throw new Error("nonce must be 8 bytes, received " + nonce.length + " bytes");
        }
    };
    /**
     * Returns the canonical difficulty for this block.
     *
     * @param parentBlockHeader - the header from the parent `Block` of this header
     */
    BlockHeader.prototype.canonicalDifficulty = function (parentBlockHeader) {
        if (this._common.consensusType() !== 'pow') {
            throw new Error('difficulty calculation is only supported on PoW chains');
        }
        if (this._common.consensusAlgorithm() !== 'ethash') {
            throw new Error('difficulty calculation currently only supports the ethash algorithm');
        }
        var hardfork = this._getHardfork();
        var blockTs = this.timestamp;
        var parentTs = parentBlockHeader.timestamp, parentDif = parentBlockHeader.difficulty;
        var minimumDifficulty = new sbr_util_1.BN(this._common.paramByHardfork('pow', 'minimumDifficulty', hardfork));
        var offset = parentDif.div(new sbr_util_1.BN(this._common.paramByHardfork('pow', 'difficultyBoundDivisor', hardfork)));
        var num = this.number.clone();
        // We use a ! here as TS cannot follow this hardfork-dependent logic, but it always gets assigned
        var dif;
        if (this._common.hardforkGteHardfork(hardfork, 'byzantium')) {
            // max((2 if len(parent.uncles) else 1) - ((timestamp - parent.timestamp) // 9), -99) (EIP100)
            var uncleAddend = parentBlockHeader.uncleHash.equals(sbr_util_1.KECCAK256_RLP_ARRAY) ? 1 : 2;
            var a = blockTs.sub(parentTs).idivn(9).ineg().iaddn(uncleAddend);
            var cutoff = new sbr_util_1.BN(-99);
            // MAX(cutoff, a)
            if (cutoff.gt(a)) {
                a = cutoff;
            }
            dif = parentDif.add(offset.mul(a));
        }
        if (this._common.hardforkGteHardfork(hardfork, 'muirGlacier')) {
            // Istanbul/Berlin difficulty bomb delay (EIP2384)
            num.isubn(9000000);
            if (num.ltn(0)) {
                num = new sbr_util_1.BN(0);
            }
        }
        else if (this._common.hardforkGteHardfork(hardfork, 'constantinople')) {
            // Constantinople difficulty bomb delay (EIP1234)
            num.isubn(5000000);
            if (num.ltn(0)) {
                num = new sbr_util_1.BN(0);
            }
        }
        else if (this._common.hardforkGteHardfork(hardfork, 'byzantium')) {
            // Byzantium difficulty bomb delay (EIP649)
            num.isubn(3000000);
            if (num.ltn(0)) {
                num = new sbr_util_1.BN(0);
            }
        }
        else if (this._common.hardforkGteHardfork(hardfork, 'homestead')) {
            // 1 - (block_timestamp - parent_timestamp) // 10
            var a = blockTs.sub(parentTs).idivn(10).ineg().iaddn(1);
            var cutoff = new sbr_util_1.BN(-99);
            // MAX(cutoff, a)
            if (cutoff.gt(a)) {
                a = cutoff;
            }
            dif = parentDif.add(offset.mul(a));
        }
        else {
            // pre-homestead
            if (parentTs.addn(this._common.paramByHardfork('pow', 'durationLimit', hardfork)).gt(blockTs)) {
                dif = offset.add(parentDif);
            }
            else {
                dif = parentDif.sub(offset);
            }
        }
        var exp = num.divn(100000).isubn(2);
        if (!exp.isNeg()) {
            dif.iadd(new sbr_util_1.BN(2).pow(exp));
        }
        if (dif.lt(minimumDifficulty)) {
            dif = minimumDifficulty;
        }
        return dif;
    };
    /**
     * Checks that the block's `difficulty` matches the canonical difficulty.
     *
     * @param parentBlockHeader - the header from the parent `Block` of this header
     */
    BlockHeader.prototype.validateDifficulty = function (parentBlockHeader) {
        return this.canonicalDifficulty(parentBlockHeader).eq(this.difficulty);
    };
    /**
     * For poa, validates `difficulty` is correctly identified as INTURN or NOTURN.
     * Returns false if invalid.
     */
    BlockHeader.prototype.validateCliqueDifficulty = function (blockchain) {
        var _this = this;
        this._requireClique('validateCliqueDifficulty');
        if (!this.difficulty.eq(clique_1.CLIQUE_DIFF_INTURN) && !this.difficulty.eq(clique_1.CLIQUE_DIFF_NOTURN)) {
            throw new Error("difficulty for clique block must be INTURN (2) or NOTURN (1), received: " + this.difficulty.toString());
        }
        if ('cliqueActiveSigners' in blockchain === false) {
            throw new Error('PoA blockchain requires method blockchain.cliqueActiveSigners() to validate clique difficulty');
        }
        var signers = blockchain.cliqueActiveSigners();
        if (signers.length === 0) {
            // abort if signers are unavailable
            return true;
        }
        var signerIndex = signers.findIndex(function (address) { return address.equals(_this.cliqueSigner()); });
        var inTurn = this.number.modn(signers.length) === signerIndex;
        if ((inTurn && this.difficulty.eq(clique_1.CLIQUE_DIFF_INTURN)) ||
            (!inTurn && this.difficulty.eq(clique_1.CLIQUE_DIFF_NOTURN))) {
            return true;
        }
        return false;
    };
    /**
     * Validates if the block gasLimit remains in the
     * boundaries set by the protocol.
     *
     * @param parentBlockHeader - the header from the parent `Block` of this header
     */
    BlockHeader.prototype.validateGasLimit = function (parentBlockHeader) {
        var parentGasLimit = parentBlockHeader.gasLimit;
        var gasLimit = this.gasLimit;
        var hardfork = this._getHardfork();
        var a = parentGasLimit.div(new sbr_util_1.BN(this._common.paramByHardfork('gasConfig', 'gasLimitBoundDivisor', hardfork)));
        var maxGasLimit = parentGasLimit.add(a);
        var minGasLimit = parentGasLimit.sub(a);
        return (gasLimit.lt(maxGasLimit) &&
            gasLimit.gt(minGasLimit) &&
            gasLimit.gte(this._common.paramByHardfork('gasConfig', 'minGasLimit', hardfork)));
    };
    /**
     * Validates the block header, throwing if invalid. It is being validated against the reported `parentHash`.
     * It verifies the current block against the `parentHash`:
     * - The `parentHash` is part of the blockchain (it is a valid header)
     * - Current block number is parent block number + 1
     * - Current block has a strictly higher timestamp
     * - Additional PoW checks ->
     *   - Current block has valid difficulty and gas limit
     *   - In case that the header is an uncle header, it should not be too old or young in the chain.
     * - Additional PoA clique checks ->
     *   - Various extraData checks
     *   - Checks on coinbase and mixHash
     *   - Current block has a timestamp diff greater or equal to PERIOD
     *   - Current block has difficulty correctly marked as INTURN or NOTURN
     * @param blockchain - validate against an @ethereumjs/blockchain
     * @param height - If this is an uncle header, this is the height of the block that is including it
     */
    BlockHeader.prototype.validate = function (blockchain, height) {
        return __awaiter(this, void 0, void 0, function () {
            var hardfork, msg, minLength, msg, signerLength, msg, msg, msg, msg, parentHeader, number, period, dif;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isGenesis()) {
                            return [2 /*return*/];
                        }
                        hardfork = this._getHardfork();
                        if (this._common.consensusAlgorithm() !== 'clique') {
                            if (this.extraData.length > this._common.paramByHardfork('vm', 'maxExtraDataSize', hardfork)) {
                                msg = 'invalid amount of extra data';
                                throw this._error(msg);
                            }
                        }
                        else {
                            minLength = clique_1.CLIQUE_EXTRA_VANITY + clique_1.CLIQUE_EXTRA_SEAL;
                            if (!this.cliqueIsEpochTransition()) {
                                // ExtraData length on epoch transition
                                if (this.extraData.length !== minLength) {
                                    msg = "extraData must be " + minLength + " bytes on non-epoch transition blocks, received " + this.extraData.length + " bytes";
                                    throw this._error(msg);
                                }
                            }
                            else {
                                signerLength = this.extraData.length - minLength;
                                if (signerLength % 20 !== 0) {
                                    msg = "invalid signer list length in extraData, received signer length of " + signerLength + " (not divisible by 20)";
                                    throw this._error(msg);
                                }
                                // coinbase (beneficiary) on epoch transition
                                if (!this.coinbase.isZero()) {
                                    msg = "coinbase must be filled with zeros on epoch transition blocks, received " + this.coinbase.toString();
                                    throw this._error(msg);
                                }
                            }
                            // MixHash format
                            if (!this.mixHash.equals(Buffer.alloc(32))) {
                                msg = "mixHash must be filled with zeros, received " + this.mixHash;
                                throw this._error(msg);
                            }
                            if (!this.validateCliqueDifficulty(blockchain)) {
                                msg = "invalid clique difficulty";
                                throw this._error(msg);
                            }
                        }
                        return [4 /*yield*/, this._getHeaderByHash(blockchain, this.parentHash)];
                    case 1:
                        parentHeader = _a.sent();
                        if (!parentHeader) {
                            throw new Error('could not find parent header');
                        }
                        number = this.number;
                        if (!number.eq(parentHeader.number.addn(1))) {
                            throw new Error('invalid number');
                        }
                        if (this.timestamp.lte(parentHeader.timestamp)) {
                            throw new Error('invalid timestamp');
                        }
                        if (this._common.consensusAlgorithm() === 'clique') {
                            period = this._common.consensusConfig().period;
                            // Timestamp diff between blocks is lower than PERIOD (clique)
                            if (parentHeader.timestamp.addn(period).gt(this.timestamp)) {
                                throw new Error('invalid timestamp diff (lower than period)');
                            }
                        }
                        if (this._common.consensusType() === 'pow') {
                            if (!this.validateDifficulty(parentHeader)) {
                                throw new Error('invalid difficulty');
                            }
                        }
                        if (!this.validateGasLimit(parentHeader)) {
                            throw new Error('invalid gas limit');
                        }
                        if (height) {
                            dif = height.sub(parentHeader.number);
                            if (!(dif.ltn(8) && dif.gtn(1))) {
                                throw new Error('uncle block has a parent that is too old or too young');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a Buffer Array of the raw Buffers in this header, in order.
     */
    BlockHeader.prototype.raw = function () {
        return [
            this.parentHash,
            this.uncleHash,
            this.coinbase.buf,
            this.stateRoot,
            this.transactionsTrie,
            this.receiptTrie,
            this.bloom,
            sbr_util_1.unpadBuffer(sbr_util_1.toBuffer(this.difficulty)),
            sbr_util_1.unpadBuffer(sbr_util_1.toBuffer(this.number)),
            sbr_util_1.unpadBuffer(sbr_util_1.toBuffer(this.gasLimit)),
            sbr_util_1.unpadBuffer(sbr_util_1.toBuffer(this.gasUsed)),
            sbr_util_1.unpadBuffer(sbr_util_1.toBuffer(this.timestamp)),
            this.extraData,
            this.mixHash,
            this.nonce,
        ];
    };
    /**
     * Returns the hash of the block header.
     */
    BlockHeader.prototype.hash = function () {
        return sbr_util_1.rlphash(this.raw());
    };
    /**
     * Checks if the block header is a genesis header.
     */
    BlockHeader.prototype.isGenesis = function () {
        return this.number.isZero();
    };
    BlockHeader.prototype._requireClique = function (name) {
        if (this._common.consensusAlgorithm() !== 'clique') {
            throw new Error("BlockHeader." + name + "() call only supported for clique PoA networks");
        }
    };
    /**
     * PoA clique signature hash without the seal.
     */
    BlockHeader.prototype.cliqueSigHash = function () {
        this._requireClique('cliqueSigHash');
        var raw = this.raw();
        raw[12] = this.extraData.slice(0, this.extraData.length - clique_1.CLIQUE_EXTRA_SEAL);
        return sbr_util_1.rlphash(raw);
    };
    /**
     * Checks if the block header is an epoch transition
     * header (only clique PoA, throws otherwise)
     */
    BlockHeader.prototype.cliqueIsEpochTransition = function () {
        this._requireClique('cliqueIsEpochTransition');
        var epoch = new sbr_util_1.BN(this._common.consensusConfig().epoch);
        // Epoch transition block if the block number has no
        // remainder on the division by the epoch length
        return this.number.mod(epoch).isZero();
    };
    /**
     * Returns extra vanity data
     * (only clique PoA, throws otherwise)
     */
    BlockHeader.prototype.cliqueExtraVanity = function () {
        this._requireClique('cliqueExtraVanity');
        return this.extraData.slice(0, clique_1.CLIQUE_EXTRA_VANITY);
    };
    /**
     * Returns extra seal data
     * (only clique PoA, throws otherwise)
     */
    BlockHeader.prototype.cliqueExtraSeal = function () {
        this._requireClique('cliqueExtraSeal');
        return this.extraData.slice(-clique_1.CLIQUE_EXTRA_SEAL);
    };
    /**
     * Seal block with the provided signer.
     * Returns the final extraData field to be assigned to `this.extraData`.
     * @hidden
     */
    BlockHeader.prototype.cliqueSealBlock = function (privateKey) {
        this._requireClique('cliqueSealBlock');
        var signature = sbr_util_1.ecsign(this.cliqueSigHash(), privateKey);
        var signatureB = Buffer.concat([signature.r, signature.s, sbr_util_1.intToBuffer(signature.v - 27)]);
        var extraDataWithoutSeal = this.extraData.slice(0, this.extraData.length - clique_1.CLIQUE_EXTRA_SEAL);
        var extraData = Buffer.concat([extraDataWithoutSeal, signatureB]);
        return extraData;
    };
    /**
     * Returns a list of signers
     * (only clique PoA, throws otherwise)
     *
     * This function throws if not called on an epoch
     * transition block and should therefore be used
     * in conjunction with `cliqueIsEpochTransition()`
     */
    BlockHeader.prototype.cliqueEpochTransitionSigners = function () {
        this._requireClique('cliqueEpochTransitionSigners');
        if (!this.cliqueIsEpochTransition()) {
            throw new Error('Signers are only included in epoch transition blocks (clique)');
        }
        var start = clique_1.CLIQUE_EXTRA_VANITY;
        var end = this.extraData.length - clique_1.CLIQUE_EXTRA_SEAL;
        var signerBuffer = this.extraData.slice(start, end);
        var signerList = [];
        var signerLength = 20;
        for (var start_1 = 0; start_1 <= signerBuffer.length - signerLength; start_1 += signerLength) {
            signerList.push(signerBuffer.slice(start_1, start_1 + signerLength));
        }
        return signerList.map(function (buf) { return new sbr_util_1.Address(buf); });
    };
    /**
     * Verifies the signature of the block (last 65 bytes of extraData field)
     * (only clique PoA, throws otherwise)
     *
     *  Method throws if signature is invalid
     */
    BlockHeader.prototype.cliqueVerifySignature = function (signerList) {
        this._requireClique('cliqueVerifySignature');
        var signerAddress = this.cliqueSigner();
        var signerFound = signerList.find(function (signer) {
            return signer.equals(signerAddress);
        });
        return !!signerFound;
    };
    /**
     * Returns the signer address
     */
    BlockHeader.prototype.cliqueSigner = function () {
        this._requireClique('cliqueSigner');
        var extraSeal = this.cliqueExtraSeal();
        // Reasonable default for default blocks
        if (extraSeal.length === 0) {
            return sbr_util_1.Address.zero();
        }
        var r = extraSeal.slice(0, 32);
        var s = extraSeal.slice(32, 64);
        var v = new sbr_util_1.BN(extraSeal.slice(64, 65)).addn(27);
        var pubKey = sbr_util_1.ecrecover(this.cliqueSigHash(), v, r, s);
        return sbr_util_1.Address.fromPublicKey(pubKey);
    };
    /**
     * Returns the rlp encoding of the block header.
     */
    BlockHeader.prototype.serialize = function () {
        return sbr_util_1.rlp.encode(this.raw());
    };
    /**
     * Returns the block header in JSON format.
     */
    BlockHeader.prototype.toJSON = function () {
        return {
            parentHash: '0x' + this.parentHash.toString('hex'),
            uncleHash: '0x' + this.uncleHash.toString('hex'),
            coinbase: this.coinbase.toString(),
            stateRoot: '0x' + this.stateRoot.toString('hex'),
            transactionsTrie: '0x' + this.transactionsTrie.toString('hex'),
            receiptTrie: '0x' + this.receiptTrie.toString('hex'),
            bloom: '0x' + this.bloom.toString('hex'),
            difficulty: sbr_util_1.bnToHex(this.difficulty),
            number: sbr_util_1.bnToHex(this.number),
            gasLimit: sbr_util_1.bnToHex(this.gasLimit),
            gasUsed: sbr_util_1.bnToHex(this.gasUsed),
            timestamp: sbr_util_1.bnToHex(this.timestamp),
            extraData: '0x' + this.extraData.toString('hex'),
            mixHash: '0x' + this.mixHash.toString('hex'),
            nonce: '0x' + this.nonce.toString('hex'),
        };
    };
    /**
     * Internal helper function to create an annotated error message
     *
     * @param msg Base error message
     * @hidden
     */
    BlockHeader.prototype._error = function (msg) {
        msg += " (" + this._errorPostfix + ")";
        var e = new Error(msg);
        return e;
    };
    BlockHeader.prototype._getHardfork = function () {
        return this._common.hardfork() || this._common.activeHardfork(this.number.toNumber());
    };
    BlockHeader.prototype._getHeaderByHash = function (blockchain, hash) {
        return __awaiter(this, void 0, void 0, function () {
            var header, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, blockchain.getBlock(hash)];
                    case 1:
                        header = (_a.sent()).header;
                        return [2 /*return*/, header];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.type === 'NotFoundError') {
                            return [2 /*return*/, undefined];
                        }
                        else {
                            throw error_1;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Force extra data be DAO_ExtraData for DAO_ForceExtraDataRange blocks after DAO
     * activation block (see: https://blog.slock.it/hard-fork-specification-24b889e70703)
     */
    BlockHeader.prototype._checkDAOExtraData = function () {
        var DAO_ExtraData = Buffer.from('64616f2d686172642d666f726b', 'hex');
        var DAO_ForceExtraDataRange = new sbr_util_1.BN(9);
        if (this._common.hardforkIsActiveOnChain('dao')) {
            // verify the extraData field.
            var blockNumber = this.number;
            var DAOActivationBlock = this._common.hardforkBlockBN('dao');
            if (blockNumber.gte(DAOActivationBlock)) {
                var drift = blockNumber.sub(DAOActivationBlock);
                if (drift.lte(DAO_ForceExtraDataRange)) {
                    if (!this.extraData.equals(DAO_ExtraData)) {
                        throw new Error("extraData should be 'dao-hard-fork'");
                    }
                }
            }
        }
    };
    return BlockHeader;
}());
exports.BlockHeader = BlockHeader;
//# sourceMappingURL=header.js.map