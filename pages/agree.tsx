import { useState } from "react";
import { Header } from "../components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const Mint = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [address, setAdress] = useState<string | null>(null);
	const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false, false, false]);
	const [checkAll, setCheckAll] = useState<boolean>(false);

	const checkedItemHandler = (idx: number, isChecked: boolean) => {
		setCheckedItems((prev: boolean[]) => {
			prev[idx] = isChecked;
			if (checkedItems.every((ele) => ele)) {
				setCheckAll(true);
			} else {
				setCheckAll(false);
			}
			return prev;
		});
	};

	useEffect(() => {
		setAdress(sessionStorage.getItem("address"));
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <></>;
	}

	if (!address) {
		router.push(`/login`);
	}

	return (
		<div className="mb-16">
			<Header />
			<main className="flex-row items-center justify-center space-y-4 text-center w-full content-center">
				<h1 className="text-xl font-bold text-gray-800 mt-8">DAO 거버넌스 설립 전 투표 및 동의</h1>
				<h2 className="text-md text-gray-800">의제</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 font-semibold w-[436px] m-auto">
					<p>1. 탄소중립 이니셔티브 실행을 위한 신재생에너지 발전소 프로젝트 시행 여부 결정​</p>
					<p>2. 프로젝트 시행을 위한 NFT 발행의 결정​</p>
					<p>
						3. 실행 프로젝트(신재생에너지 발전소)를 제안한 디폴트 컨트랙터를 해당 프로젝트 분야의 업무 집행자, 대외적
						법률행위자, 프로젝트 책임자로 선임 및 위임하는 결정​
					</p>
				</div>
				<div className="border-t-2 w-[460px] mx-auto"></div>
				<h1 className="text-xl font-bold text-gray-800 mt-8">의제 투표 참가</h1>
				<h2 className="text-sm text-gray-800">투표 자격 요건 확인</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 w-[436px] m-auto">
					<p>1. 기후 위기에 대한 문제 의식에 공감하는 에코 시민​</p>
					<p>2. CZero DAO 참여 후 공동 행동을 통해 실질적인 탄소 감축에 기여하기를 희망하는 사람​</p>
					<p>3. CZero DAO 커뮤니티 멤버 (https://t.me/czero_finance_kr)​</p>
					<p>4. CZero Docs 확인(읽기) 완료자</p>
				</div>
				<div className="flex items-center mb-4 w-[434px] mx-auto justify-end">
					<input
						id="default-checkbox"
						type="checkbox"
						onChange={(e) => checkedItemHandler(0, e.target.checked)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label className="ml-2 text-xs font-medium text-gray-900">동의합니다</label>
				</div>
				<h2 className="text-sm text-gray-800">탄소 중립 이니셔티브 프로젝트 시행 여부 결정</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 w-[436px] m-auto space-y-3">
					<p>
						1. CZero DAO에서 지원하는 탄소 중립 프로젝트는 명확한 탄소 감축 효과가 일어나는 프로젝트여야 하며 그 DATA가
						DAO에 제공되야 함.​
					</p>
					<p>
						2. CZero DAO의 ​탄소중립 이니셔티브 달성을 위한 첫번째 프로젝트 분야로 신재생에너지(태양광) 발전소
						확장(건설) 지원 프로젝트의 실행​
					</p>
					<p>
						3. ​프로젝트 지원금은 디폴트 컨트랙터의 신재생에너지 발전소 매입 자금의 30% 규모이며 나머지 70% 투자 금액은
						디폴트 컨트랙터가 마련하여 제공한다.​
					</p>
				</div>
				<div className="flex items-center mb-4 w-[434px] mx-auto justify-end">
					<input
						id="default-checkbox"
						type="checkbox"
						onChange={(e) => checkedItemHandler(1, e.target.checked)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label className="ml-2 text-xs font-medium text-gray-900">동의합니다</label>
				</div>
				<h2 className="text-sm text-gray-800">신재생에너지 NFT 발행 및 결정</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 w-[436px] m-auto space-y-3">
					<p>
						1. CZero DAO의 탄소중립 이니셔티브 달성을 위한 신재생에너지 발전소 확장 프로젝트의 지원을 위한 NFT 발행​
					</p>
					<p>
						2. NFT 총 발행 용량은 5,000,000Wp로 100Wp, 1,000Wp(1KWp), 10,000Wp(10KWp), 100,000Wp(100KWp) 단위로 발행되며
						1W 당 민팅 기준 단가는 2,300KRW​
					</p>
					<p>3. 판매 단위별로 할인이 적용. 100Wp는 5%, 1,000Wp는 10%, 10,000Wp는 15%, 100,000Wp는 20%할인이 적용​</p>
					<p>4. 민팅 NFT 발행 수는 2,000개 이하</p>
				</div>
				<div className="flex items-center mb-4 w-[434px] mx-auto justify-end">
					<input
						id="default-checkbox"
						type="checkbox"
						onChange={(e) => checkedItemHandler(2, e.target.checked)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label className="ml-2 text-xs font-medium text-gray-900">동의합니다</label>
				</div>
				<h2 className="text-sm text-gray-800">제안 프로젝트 정보 확인</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 w-[436px] m-auto space-y-3">
					<p className="font-bold">프로젝트 : 5MWp 신재생에너지(태양광) 발전소 건설​</p>
					<p className="font-bold">프로젝트로 완료 후 예상 되는 1년 전력 생산량(kWh) : 6,570,000kWh​</p>
					<p>
						- 예상 전력 생산량 계산 방법 : 약 3.6시간(전국 태양광 발전소 평균 발전시간) X 5,000Wp(발전소 용량) X 365일​
					</p>
					<p>
						- 예상 탄소 저감 수치 계산 방법 : 총 온실가스 감축량 (tCO2eq) = 감축사업에 의한 전력생산량 (kWh) X
						0.45941조정 전력 배출계수 (tCO2eq/MWh)/1,000
					</p>
					<p>
						- 소나무(평균) 1그루의 연간 CO2 흡수량: 2.35kg - 「주요 산림수종의 표준 탄소흡수량(2013)」, 국립산림과학원
					</p>
					<p className="font-semibold text-gray-800">지원 예정 발전소 정보 확인 : https://www.czero.team</p>
					<div className="text-center flex justify-center space-x-2">
						<div className="border px-4 py-2 rounded border-gray-300">
							<p>우곡리 태양광 발전소</p>
							<p>795kWp</p>
							<p className="font-bold">바로가기</p>
						</div>
						<div className="border px-4 py-2 rounded border-gray-300">
							<p>봉성리 태양광 발전소</p>
							<p>500kWp</p>
							<p className="font-bold">바로가기</p>
						</div>
						<div className="border px-4 py-2 rounded border-gray-300">
							<p>개발 협약서</p>
							<p>3,705kWp</p>
							<p className="font-bold">바로가기</p>
						</div>
					</div>
				</div>
				<div className="flex items-center mb-4 w-[434px] mx-auto justify-end">
					<input
						id="default-checkbox"
						type="checkbox"
						onChange={(e) => checkedItemHandler(3, e.target.checked)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label className="ml-2 text-xs font-medium text-gray-900">동의합니다</label>
				</div>
				<h2 className="text-sm text-gray-800">디폴트 컨트랙터 선임 동의</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 w-[436px] m-auto space-y-3">
					<p>1. 신재생에너지 발전소 5MWp 확장(건설) 프로젝트 디폴트 컨트랙터로 (주)씨제로 에너지솔루션 선임</p>
					<p>
						2. (주)씨제로 에너지솔루션을 CZero DAO의 탄소 중립 이니셔티브 달성을 위한 신재생에너지 발전소 확대 지원
						프로젝트 분야의 업무 집행자, 대외적 법률행위자, 프로젝트 책임자로 선임 및 위임하는 결정​
					</p>

					<p>3. 주)씨제로 에너지솔루션 정보​</p>
					<div className="space-y-1">
						<p>- ​사업자번호 : 537-86-02654</p>
						<p>- 법인등록번호 : 134111-0611223</p>
						<p>- 설립연월 : 2022년 6월 8일</p>
						<p>- 자본금 : 1억원</p>
						<p>- 자산 규모 : 17억원</p>
					</div>
					<div className="border px-4 py-2 rounded border-gray-300 mx-2 text-center">
						<p>디폴트컨트랙터</p>
						<p>​재무건전성 자료</p>
						<p className="font-bold">바로가기</p>
					</div>
				</div>
				<div className="flex items-center mb-4 w-[434px] mx-auto justify-end">
					<input
						id="default-checkbox"
						type="checkbox"
						onChange={(e) => checkedItemHandler(4, e.target.checked)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label className="ml-2 text-xs font-medium text-gray-900">동의합니다</label>
				</div>
				<h2 className="text-sm text-gray-800">​위험성 고지</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 w-[436px] m-auto space-y-3">
					<p>
						1. 신재생에너지 발전소 확장 프로젝트는 발전소의 위치와 기후, 기계장치의 이상 및 노후와 그리고 기타 다양한
						이유로 탄소 감축량에 변동이 있을 수 있다​
					</p>
					<p>
						2. 다오에서 지원한 프로젝트의 성과는 탄소감축량에 따라 결정되는 것이며 수익성이나 보상 등은 다오의 목표나
						성과 지표가 될 수 없다.​
					</p>
					<p>
						3. ​다오가 신재생에너지 발전소 건설 프로젝트에 지원하는 자금은 총 매입 자금의 30% 수준이며 이 지원이 해당
						프로젝트의 100% 성공을 담보하지 않는다.​
					</p>
					<p>
						4. 프로젝트에 자금을 지원을 하고 토지 매입 및 발전소 개발 허가를 들어가더라도 개발 허가에 실패하거나 민원
						등으로 프로젝트가 취소 되거나 개발 기간이 예상 기간보다 길어질 수 있다.
					</p>
					<p>
						5. 다오가 30%를 지원하고 디폴트 컨트랙터가 70% 투자금을 조달하여 개발 되고 발전소에는 은행에서 일부 근저당
						설정이 들어올 수 있다.
					</p>
				</div>
				<div className="flex items-center mb-4 w-[434px] mx-auto justify-end">
					<input
						id="default-checkbox"
						type="checkbox"
						onChange={(e) => checkedItemHandler(5, e.target.checked)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label className="ml-2 text-xs font-medium text-gray-900">동의합니다</label>
				</div>
				<h2 className="text-sm text-gray-800">개인정보 동의</h2>
				<div className="border text-start py-4 px-4 text-xs rounded-sm border-gray-300 w-[436px] m-auto space-y-4">
					<div className="text-md text-center space-y-2 border rounded-sm py-4">
						<div>
							<p className="font-bold">제공받는 자:</p>
							<p>CZero DAO</p>
						</div>
						<div>
							<p className="font-bold">제공 항목:</p>
							<p>지갑 주소</p>
						</div>
						<div>
							<p className="font-bold">제공 목적:</p>
							<p>투표 및 NFT민팅 참여</p>
						</div>
						<div>
							<p className="font-bold">보유 및 이용기간:</p>
							<p>1년</p>
						</div>
					</div>
					<p>
						- 위와 같이 개인정보를 제공하는데 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 Dapp 이용 및
						서비스 제공을 받으실 수 없습니다.​
					</p>
					<p>- 만 14세 미만의 아동의 경우 이용하실 수 없습니다.​</p>
					<p className="font-bold">본인은 만 14세 이하가 아니며 위와 같이 개인정보를 제공하는데 동의합니다.</p>
				</div>
				<div className="flex items-center mb-4 w-[434px] mx-auto justify-end">
					<input
						id="default-checkbox"
						type="checkbox"
						onChange={(e) => checkedItemHandler(6, e.target.checked)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label className="ml-2 text-xs font-medium text-gray-900">동의합니다</label>
				</div>
				<button
					className={`w-[436px] ${
						checkAll ? "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 transition" : "bg-blue-300"
					} py-3 border text-white rounded-md text-semibold`}
					disabled={!checkAll}
				>
					{checkAll ? "제출하기" : "전체 동의 필요"}
				</button>
			</main>
		</div>
	);
};

export default Mint;
